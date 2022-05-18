const {
  accounts,
  contract
} = require('@openzeppelin/test-environment');

const { expect } = require('chai');
require('chai').use(require('chai-as-promised')).should();

const EVM_REVERT = 'VM Exception while processing transaction: revert';

const ArtNFT = contract.fromArtifact("ArtNFT");

describe('ArtNFT', function () {
  const [ owner ] = accounts;

  beforeEach(async function () {
    this.artnft = await ArtNFT.new({from: owner});
  });

  it('the deployer is the owner', async function () {
    console.log(accounts);
    expect(await this.artnft.owner()).to.equal(owner);
  });

  it('the contract name is ArtNFT', async function () {
    expect(await this.artnft.name()).to.equal('ArtNFT');
  });

  it('the contract symbol is ANT', async function () {
    expect(await this.artnft.symbol()).to.equal('ANT');
  });

  it('multiple minting test - the owner of nft should be correct', async function () {
    let step;
    let accountIndex; // Max is 9
    let totalUsedGas;
    const MAX_ACCOUNT = 10;
    const MAX_TRY = 10;
    const DUMMY_TOKEN_URI = "www.google.com";
    for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
      let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
      expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
      totalUsedGas += result.receipt.gasUsed;
      if (accountIndex == MAX_ACCOUNT) {
        accountIndex = 0;
      } else {
        accountIndex++;
      }
    }
    console.log(`Total Try is ${MAX_TRY}. Total used gas : ${totalUsedGas}`);
  });

  it('tokenUri access test - token owner should be allowed', async function () {
    let step;
    let accountIndex;
    const MAX_ACCOUNT = 10;
    const MAXTRY = 10;
    const DUMMY_TOKEN_URI = "www.google.com";
    for (step=0, accountIndex=0; step < MAXTRY ; step++ ) {
      await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
      let result = await this.artnft.tokenURI(step, {from: accounts[accountIndex]});
      expect(result).to.equal(DUMMY_TOKEN_URI);
      if (accountIndex == MAX_ACCOUNT) {
        accountIndex = 0;
      } else {
        accountIndex++;
      }
    }
  });

  it('tokenUri access reject test - others who has not permission should not be allowed', async function () {
    let tokenId = 0;
    let tokenOwner = accounts[1];
    let other = accounts[2];
    const DUMMY_TOKEN_URI = "www.google.com";
    await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
    expect(await this.artnft.tokenURI(tokenId, {from: other}).should.be.rejectedWith(EVM_REVERT));
  });



  it('token Owner can allow permission to others', async function () {
    let tokenId = 0;
    let nftowner = accounts[3];
    let nftviewer = accounts[4];
    const TOKENURI = "www.google.com";
    const ALLOWED_SEC = 60;

    let mint_result = await this.artnft.safeMint(nftowner, TOKENURI, {from: owner});
    console.log(`one time minting gas Used : ${mint_result.receipt.gasUsed}`);

    let nftowner_access_result = await this.artnft.tokenURI(tokenId, {from: nftowner});
    console.log(`[nftowner] tokenURI : ${nftowner_access_result}`);
    expect(nftowner_access_result).to.equal(TOKENURI);

    // Allow Permission
    let allow_reviewer_result = await this.artnft.allowPermission(tokenId, ALLOWED_SEC, nftviewer, {from : nftowner});
    console.log(`one time grant permission gas Used : ${allow_reviewer_result.receipt.gasUsed}`);
    let nftviewer_access_result = await this.artnft.tokenURI(tokenId, {from: nftviewer});
    console.log(`[nftviewer] tokenURI : ${nftviewer_access_result}`);
    expect(nftviewer_access_result).to.equal(TOKENURI);
  });

  it('No permission No access - only token owner set permission', async function() {
    let nftowner = accounts[4];
    let nftviewer = accounts[5];
    const TOKENURI = "www.google.com";
    const ALLOWED_SEC = 60;

    await this.artnft.safeMint(nftowner, TOKENURI, {from: owner});
    expect(await this.artnft.allowPermission(0, ALLOWED_SEC, nftviewer, {from : owner}).should.be.rejectedWith(EVM_REVERT));
  });

  it('token transfer', async function() {
    let tokenId = 0;
    let tokenOwner = accounts[1];
    let newOwner = accounts[2];
    const DUMMY_TOKEN_URI = "www.google.com";
    await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
    let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
    console.log(`one time token transfer gas Used : ${transfer_result.receipt.gasUsed}`);
    console.log(`token owner change from ${tokenOwner} to ${newOwner}`);
    expect(await this.artnft.tokenURI(tokenId, {from: newOwner})).to.equal(DUMMY_TOKEN_URI);
  });

  it('should not access token after token transfer', async function() {
    let tokenId = 0;
    let tokenOwner = accounts[1];
    let newOwner = accounts[2];
    const DUMMY_TOKEN_URI = "www.google.com";
    await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
    await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
    let admin_account = await this.artnft.getOwnerAccount(tokenId);
    console.log(admin_account);
    expect(await this.artnft.tokenURI(tokenId, {from: tokenOwner}).should.be.rejectedWith(EVM_REVERT));
  });

  it('After permission time expired, user can not access token metadata', async function() {
    let tokenId = 0;
    let nftowner = accounts[6];
    let nftviewer = accounts[7];
    const TOKENURI = "www.google.com";
    const ALLOWED_SEC = 60;

    await this.artnft.safeMint(nftowner, TOKENURI, {from: owner});
    await this.artnft.allowPermission(tokenId, ALLOWED_SEC, nftviewer, {from : nftowner});
    let nftviewer_access_result = await this.artnft.tokenURI(tokenId, {from: nftviewer});
    console.log(`[nftviewer] tokenURI : ${nftviewer_access_result}`);
    setTimeout(async () => {
      expect(await this.artnft.tokenURI(tokenId, {from: nftviewer}).should.be.rejectedWith(EVM_REVERT));
    }, ALLOWED_SEC);
  });

});

