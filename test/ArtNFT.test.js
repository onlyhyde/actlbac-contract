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
  const DUMMY_TOKEN_URI = "ipfs://777070ca-6030-4331-b47b-712e3fa0a47f/2021-06-15T09:07:18.184Z.png";
  const DUMMY_TOKEN_URI1 = "ipfs://777070ca-6030-4331-b47b-712e3fa0a47f/2021-06-15-1.png";
  const DUMMY_TOKEN_URI2 = "ipfs://777070ca-6030-4331-b47b-712e3fa0a47f/2021-06-15-2.png";
  const DUMMY_TOKEN_URI3 = "ipfs://777070ca-6030-4331-b47b-712e3fa0a47f/2021-06-15-3.png";
  const DUMMY_METADATA_HASH = '7a5af6d66da0d02767539698e68ce132a5fba1a5636836a2234a77b7124f4b16';

  beforeEach(async function () {
    this.artnft = await ArtNFT.new({from: owner});
  });

  // it('the deployer is the owner', async function () {
  //   console.log(accounts);
  //   expect(await this.artnft.owner()).to.equal(owner);
  // });

  // it('multiple minting test - the owner of nft should be correct', async function () {
  //   let step;
  //   let accountIndex; // Max is 9
  //   let totalUsedGas;
  //   const MAX_ACCOUNT = 10;
  //   const MAX_TRY = 100;
  //   for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
  //     let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //     expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
  //     totalUsedGas += result.receipt.gasUsed;

  //     // TODO :
  //     // 1. metadata 체크
  //     if (accountIndex == MAX_ACCOUNT-1) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAX_TRY}. Total used gas : ${totalUsedGas}`);
  // });


  // it('TokenURI access test - token owner should be allowed', async function () {
  //   console.log(accounts);
  //   let step;
  //   let accountIndex;
    
  //   await this.artnft.safeMint(accounts[1], DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`NFT Minting tokenId = 0, owner = ${accounts[1]}`);

  //   let result_owner = await this.artnft.tokenURI(0, {from: accounts[1]});
  //   console.log(`try to get tokenURI by owner=${accounts[1]} : result = ${result_owner}`);

  //   let result_other1 = await this.artnft.tokenURI(0, {from: accounts[2]});
  //   console.log(`try to get tokenURI by other=${accounts[2]} : result = ${result_other1}`);

  //   let result_other2 = await this.artnft.tokenURI(0, {from: accounts[3]});
  //   console.log(`try to get tokenURI by other=${accounts[3]} : result = ${result_other2}`);

  //   let result_other3 = await this.artnft.tokenURI(0, {from: accounts[4]});
  //   console.log(`try to get tokenURI by other=${accounts[4]} : result = ${result_other3}`);
  // });

  // it('TokenURI access test - only token owner should be allowed', async function () {
  //   console.log(accounts);
  //   let step;
  //   let accountIndex;
    
  //   await this.artnft.safeMint(accounts[1], DUMMY_TOKEN_URI1, {from: owner});
  //   console.log(`NFT Minting tokenId=0, owner=${accounts[1]}, TokenURI=${DUMMY_TOKEN_URI1}`);

  //   await this.artnft.safeMint(accounts[2], DUMMY_TOKEN_URI2, {from: owner});
  //   console.log(`NFT Minting tokenId=1, owner=${accounts[2]}, TokenURI=${DUMMY_TOKEN_URI2}`);

  //   await this.artnft.safeMint(accounts[3], DUMMY_TOKEN_URI3, {from: owner});
  //   console.log(`NFT Minting tokenId=2, owner=${accounts[3]}, TokenURI=${DUMMY_TOKEN_URI3}`);


  //   let result_other1 = await this.artnft.tokenURI(0, {from: accounts[2]});
  //   console.log(`try to get tokenURI of tokenId=0 by owner of tokenId1=${accounts[2]} : result = ${result_other1}`);

  //   let result_other2 = await this.artnft.tokenURI(1, {from: accounts[3]});
  //   console.log(`try to get tokenURI of tokenId=1 by owner of tokenId2=${accounts[3]} : result = ${result_other2}`);

  //   let result_other3 = await this.artnft.tokenURI(2, {from: accounts[1]});
  //   console.log(`try to get tokenURI of tokenId=2 by owner of tokenId0=${accounts[1]} : result = ${result_other3}`);

  // });


  // it('tokenUri access test - allowed user can access metadata', async function () {
  //   console.log(accounts);
  //   let step;
  //   let accountIndex;
  //   let totalUsedGas=0;
  //   const MAX_ACCOUNT = 9;
  //   const MAXTRY = 1;
  //   await this.artnft.safeMint(accounts[0], DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`NFT Minting tokenId=0, owner=${accounts[0]}`);
  //   for (step=0, accountIndex=1; step < MAXTRY ; step++ ) {
  //     let addrole_result = await this.artnft.grant_time(0, accounts[accountIndex], 60, {from: owner});
  //     totalUsedGas += addrole_result.receipt.gasUsed;
  //     let result = await this.artnft.tokenURI(0, {from: accounts[accountIndex]});
  //     console.log(`accounts[${accountIndex}] : ${result}`);
  //     expect(result).to.equal(DUMMY_TOKEN_URI);
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAXTRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('tokenUri access test - allowed user can access metadata', async function () {
  //   console.log(accounts);
  //   let step;
  //   let accountIndex;
  //   let totalUsedGas=0;
  //   const MAX_ACCOUNT = 9;
  //   const MAXTRY = 3;
  //   await this.artnft.safeMint(accounts[0], DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`NFT Minting tokenId=0, owner=${accounts[0]}`);
  //   for (step=0, accountIndex=1; step < MAXTRY ; step++ ) {
  //     let addrole_result = await this.artnft.grant_time(0, accounts[accountIndex], 60, {from: owner});
  //     totalUsedGas += addrole_result.receipt.gasUsed;
  //     let result = await this.artnft.tokenURI(0, {from: accounts[accountIndex]});
  //     console.log(`accounts[${accountIndex}] : ${result}`);
  //     expect(result).to.equal(DUMMY_TOKEN_URI);
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAXTRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('tokenUri access test - allowed user can access metadata', async function () {
  //   console.log(accounts);
  //   let step;
  //   let accountIndex;
  //   let totalUsedGas=0;
  //   const MAX_ACCOUNT = 9;
  //   const MAXTRY = 5;
  //   await this.artnft.safeMint(accounts[0], DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`NFT Minting tokenId=0, owner=${accounts[0]}`);
  //   for (step=0, accountIndex=1; step < MAXTRY ; step++ ) {
  //     let addrole_result = await this.artnft.grant_time(0, accounts[accountIndex], 60, {from: owner});
  //     totalUsedGas += addrole_result.receipt.gasUsed;
  //     let result = await this.artnft.tokenURI(0, {from: accounts[accountIndex]});
  //     console.log(`accounts[${accountIndex}] : ${result}`);
  //     expect(result).to.equal(DUMMY_TOKEN_URI);
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAXTRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('tokenUri access test - allowed user can access metadata', async function () {
  //   console.log(accounts);
  //   let step;
  //   let accountIndex;
  //   let totalUsedGas=0;
  //   const MAX_ACCOUNT = 9;
  //   const MAXTRY = 9;
  //   await this.artnft.safeMint(accounts[0], DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`NFT Minting tokenId=0, owner=${accounts[0]}`);
  //   for (step=0, accountIndex=1; step < MAXTRY ; step++ ) {
  //     let addrole_result = await this.artnft.grant_time(0, accounts[accountIndex], 60, {from: owner});
  //     totalUsedGas += addrole_result.receipt.gasUsed;
  //     let result = await this.artnft.tokenURI(0, {from: accounts[accountIndex]});
  //     console.log(`accounts[${accountIndex}] : ${result}`);
  //     expect(result).to.equal(DUMMY_TOKEN_URI);
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAXTRY}. Total used gas : ${totalUsedGas}`);
  // });


  // it('the contract name is ArtNFT', async function () {
  //   expect(await this.artnft.name()).to.equal('ArtNFT');
  // });

  // it('the contract symbol is ANT', async function () {
  //   expect(await this.artnft.symbol()).to.equal('ANT');
  // });

  // it('multiple minting test - the owner of nft should be correct', async function () {
  //   let step;
  //   let accountIndex; // Max is 9
  //   let totalUsedGas;
  //   const MAX_ACCOUNT = 10;
  //   const MAX_TRY = 100;
  //   for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
  //     let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //     expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
  //     totalUsedGas += result.receipt.gasUsed;
  //     if (accountIndex == MAX_ACCOUNT-1) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAX_TRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('tokenUri access test - token owner should be allowed', async function () {
  //   let step;
  //   let accountIndex;
  //   const MAX_ACCOUNT = 10;
  //   const MAXTRY = 10;
  //   for (step=0, accountIndex=0; step < MAXTRY ; step++ ) {
  //     await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //     let result = await this.artnft.tokenURI(step, {from: accounts[accountIndex]});
  //     expect(result).to.equal(DUMMY_TOKEN_URI);
  //     if (accountIndex == MAX_ACCOUNT-1) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  // });

  // it('tokenUri access reject test - others who has not permission should not be allowed', async function () {
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let other = accounts[2];
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   expect(await this.artnft.tokenURI(tokenId, {from: other}).should.be.rejectedWith(EVM_REVERT));
  // });



  // it('token Owner can allow permission to others', async function () {
  //   let tokenId = 0;
  //   let nftowner = accounts[3];
  //   let nftviewer = accounts[4];
  //   const ALLOWED_SEC = 60;

  //   let mint_result = await this.artnft.safeMint(nftowner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   console.log(`one time minting gas Used : ${mint_result.receipt.gasUsed}`);

  //   let nftowner_access_result = await this.artnft.tokenURI(tokenId, {from: nftowner});
  //   console.log(`[nftowner] tokenURI : ${nftowner_access_result}`);
  //   expect(nftowner_access_result).to.equal(DUMMY_TOKEN_URI);

  //   // Allow Permission
  //   let allow_reviewer_result = await this.artnft.allowPermission(tokenId, ALLOWED_SEC, nftviewer, {from : nftowner});
  //   console.log(`one time grant permission gas Used : ${allow_reviewer_result.receipt.gasUsed}`);
  //   let nftviewer_access_result = await this.artnft.tokenURI(tokenId, {from: nftviewer});
  //   console.log(`[nftviewer] tokenURI : ${nftviewer_access_result}`);
  //   expect(nftviewer_access_result).to.equal(DUMMY_TOKEN_URI);
  // });

  // it('No permission No access - only token owner set permission', async function() {
  //   let nftowner = accounts[4];
  //   let nftviewer = accounts[5];
  //   const ALLOWED_SEC = 60;

  //   await this.artnft.safeMint(nftowner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   expect(await this.artnft.allowPermission(0, ALLOWED_SEC, nftviewer, {from : owner}).should.be.rejectedWith(EVM_REVERT));
  // });

  // it('token transfer', async function() {
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let newOwner = accounts[2];
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
  //   console.log(`one time token transfer gas Used : ${transfer_result.receipt.gasUsed}`);
  //   console.log(`token owner change from ${tokenOwner} to ${newOwner}`);
  //   expect(await this.artnft.tokenURI(tokenId, {from: newOwner})).to.equal(DUMMY_TOKEN_URI);
  // });

  // it('should not access token after token transfer', async function() {
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let newOwner = accounts[2];
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
  //   let admin_account = await this.artnft.getOwnerAccount(tokenId);
  //   console.log(admin_account);
  //   expect(await this.artnft.tokenURI(tokenId, {from: tokenOwner}).should.be.rejectedWith(EVM_REVERT));
  // });

  // it('After permission time expired, user can not access token metadata', async function() {
  //   let tokenId = 0;
  //   let nftowner = accounts[6];
  //   let nftviewer = accounts[7];
  //   const ALLOWED_SEC = 60;

  //   await this.artnft.safeMint(nftowner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   await this.artnft.allowPermission(tokenId, ALLOWED_SEC, nftviewer, {from : nftowner});
  //   let nftviewer_access_result = await this.artnft.tokenURI(tokenId, {from: nftviewer});
  //   console.log(`[nftviewer] tokenURI : ${nftviewer_access_result}`);
  //   setTimeout(async () => {
  //     expect(await this.artnft.tokenURI(tokenId, {from: nftviewer}).should.be.rejectedWith(EVM_REVERT));
  //   }, ALLOWED_SEC);
  // });

  // it('After permission time expired, user can not check token metadata hash', async function() {
  //   let tokenId = 0;
  //   let nftowner = accounts[6];
  //   let nftviewer = accounts[7];
  //   const ALLOWED_SEC = 60;

  //   await this.artnft.safeMint(nftowner, DUMMY_TOKEN_URI, DUMMY_METADATA_HASH, {from: owner});
  //   await this.artnft.allowPermission(tokenId, ALLOWED_SEC, nftviewer, {from : nftowner});
  //   let nftviewer_check_hash_result = await this.artnft.isValidHash(tokenId, DUMMY_METADATA_HASH, {from: nftviewer});
  //   console.log(`[nftviewer] isValidHash : ${nftviewer_check_hash_result}`);
  //   expect(nftviewer_check_hash_result).to.equal(true);
  //   setTimeout(async () => {
  //     expect(await this.artnft.isValidHash(tokenId, DUMMY_METADATA_HASH, {from: nftviewer}).should.be.rejectedWith(EVM_REVERT));
  //   }, ALLOWED_SEC);
  // });

  console.log(accounts);

  // it('token transfer - approve', async function() {  
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let newOwner = accounts[2];
  //   let dummy_contract = accounts[3];
  //   let totalUsedGas = 0;

  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`old Owner=${tokenOwner}, tokenURI:${DUMMY_TOKEN_URI}`);
  //   let add_whitelist_result = await this.artnft.add_whitelist(dummy_contract, {from: owner});
  //   totalUsedGas += add_whitelist_result.receipt.gasUsed;

  //   let approved_result = await this.artnft.approve(dummy_contract, tokenId, {from: tokenOwner});
  //   totalUsedGas += approved_result.receipt.gasUsed;

  //   let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: dummy_contract});
  //   totalUsedGas += transfer_result.receipt.gasUsed;

  //   console.log(`token transfer gas Used : ${totalUsedGas}`);

  //   let newOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: newOwner});
  //   console.log(`new Owner=${newOwner}, tokenURI:${newOwner_ac_result}`);
  //   // let oldOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: tokenOwner});
  //   // console.log(`old Owner=${tokenOwner}, tokenURI:${oldOwner_ac_result}`);
  // });

  // it('token transfer - setApprovalForAll', async function() {
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let newOwner = accounts[2];
  //   let dummy_contract = accounts[3];
  //   let totalUsedGas = 0;

  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
  //   console.log(`old Owner=${tokenOwner}, tokenURI:${DUMMY_TOKEN_URI}`);
  //   let add_whitelist_result = await this.artnft.add_whitelist(dummy_contract, {from: owner});
  //   totalUsedGas += add_whitelist_result.receipt.gasUsed;

  //   let approved_result = await this.artnft.setApprovalForAll(dummy_contract, true, {from: tokenOwner});
  //   totalUsedGas += approved_result.receipt.gasUsed;

  //   let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: dummy_contract});
  //   totalUsedGas += transfer_result.receipt.gasUsed;

  //   console.log(`token transfer gas Used : ${totalUsedGas}`);

  //   let newOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: newOwner});
  //   console.log(`new Owner=${newOwner}, tokenURI:${newOwner_ac_result}`);
  //   // let oldOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: tokenOwner});
  //   // console.log(`old Owner=${tokenOwner}, tokenURI:${oldOwner_ac_result}`);
  // });

  it('token transfer - P2P', async function() {  
    let tokenId = 0;
    let tokenOwner = accounts[1];
    let newOwner = accounts[2];
    let totalUsedGas = 0;

    await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
    console.log(`old Owner=${tokenOwner}, tokenURI:${DUMMY_TOKEN_URI}`);
    
    let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
    totalUsedGas += transfer_result.receipt.gasUsed;

    console.log(`token transfer gas Used : ${totalUsedGas}`);

    let newOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: newOwner});
    console.log(`new Owner=${newOwner}, tokenURI:${newOwner_ac_result}`);
    let oldOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: tokenOwner});
    console.log(`old Owner=${tokenOwner}, tokenURI:${oldOwner_ac_result}`);
  });
});

