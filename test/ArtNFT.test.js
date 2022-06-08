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
  const DUMMY_METADATA_HASH = '7a5af6d66da0d02767539698e68ce132a5fba1a5636836a2234a77b7124f4b16';

  beforeEach(async function () {
    this.artnft = await ArtNFT.new({from: owner});
  });

  // it('the deployer is the owner', async function () {
  //   console.log(accounts);
  //   expect(await this.artnft.owner()).to.equal(owner);
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
  //   const MAX_ACCOUNT = 9;
  //   const MAX_TRY = 1;
  //   const DUMMY_TOKEN_URI = "www.google.com";
  //   for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
  //     let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
  //     expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
  //     totalUsedGas += result.receipt.gasUsed;
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAX_TRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('multiple minting test - the owner of nft should be correct', async function () {
  //   let step;
  //   let accountIndex; // Max is 9
  //   let totalUsedGas;
  //   const MAX_ACCOUNT = 9;
  //   const MAX_TRY = 10;
  //   const DUMMY_TOKEN_URI = "www.google.com";
  //   for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
  //     let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
  //     expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
  //     totalUsedGas += result.receipt.gasUsed;
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAX_TRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('multiple minting test - the owner of nft should be correct', async function () {
  //   let step;
  //   let accountIndex; // Max is 9
  //   let totalUsedGas;
  //   const MAX_ACCOUNT = 9;
  //   const MAX_TRY = 100;
  //   const DUMMY_TOKEN_URI = "www.google.com";
  //   for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
  //     let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
  //     expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
  //     totalUsedGas += result.receipt.gasUsed;
  //     if (accountIndex == MAX_ACCOUNT) {
  //       accountIndex = 0;
  //     } else {
  //       accountIndex++;
  //     }
  //   }
  //   console.log(`Total Try is ${MAX_TRY}. Total used gas : ${totalUsedGas}`);
  // });

  // it('multiple minting test - the owner of nft should be correct', async function () {
  //   let step;
  //   let accountIndex; // Max is 9
  //   let totalUsedGas;
  //   const MAX_ACCOUNT = 9;
  //   const MAX_TRY = 200;
  //   const DUMMY_TOKEN_URI = "www.google.com";
  //   for (step=0, accountIndex=0, totalUsedGas=0; step < MAX_TRY ; step++ ) {
  //     let result = await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
  //     expect(await this.artnft.ownerOf(step)).to.equal(accounts[accountIndex]);
  //     totalUsedGas += result.receipt.gasUsed;
  //     if (accountIndex == MAX_ACCOUNT) {
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

  console.log(accounts);
    
  // it('token transfer - approve', async function() {
  //   let tokenId = 0;
  //   let dummy_contract = accounts[1];
  //   let tokenOwner = accounts[2];
  //   let newOwner = accounts[3];
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
  //   await this.artnft.approve(dummy_contract, tokenId, {from: tokenOwner});

  //   let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
  //   console.log(`token transfer gas Used : ${transfer_result.receipt.gasUsed}`);
  //   expect(await this.artnft.tokenURI(tokenId, {from: newOwner})).to.equal(DUMMY_TOKEN_URI);
  //   let newOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: newOwner});
  //   console.log(`new Owner=${newOwner}, tokenURI:${newOwner_ac_result}`);
  //   let oldOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: tokenOwner});
  //   console.log(`old Owner=${tokenOwner}, tokenURI:${newOwner_ac_result}`);
  // });

  // it('token transfer - setApprovalForAll', async function() {
  //   let tokenId = 0;
  //   let dummy_contract = accounts[1];
  //   let tokenOwner = accounts[2];
  //   let newOwner = accounts[3];
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
  //   await this.artnft.setApprovalForAll(dummy_contract, true, {from: tokenOwner});

  //   let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
  //   console.log(`token transfer gas Used : ${transfer_result.receipt.gasUsed}`);
  //   expect(await this.artnft.tokenURI(tokenId, {from: newOwner})).to.equal(DUMMY_TOKEN_URI);
  //   let newOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: newOwner});
  //   console.log(`new Owner=${newOwner}, tokenURI:${newOwner_ac_result}`);
  //   let oldOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: tokenOwner});
  //   console.log(`old Owner=${tokenOwner}, tokenURI:${newOwner_ac_result}`);
  // });

  // it('can access token after token transfer', async function() {
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let newOwner = accounts[2];
  //   const DUMMY_TOKEN_URI = "www.google.com";
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
  //   await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
  //   expect(await this.artnft.tokenURI(tokenId, {from: tokenOwner})).to.equal(DUMMY_TOKEN_URI);
  // });

  it('token transfer - P2P', async function() {
    let tokenId = 0;
    let dummy_contract = accounts[1];
    let tokenOwner = accounts[2];
    let newOwner = accounts[3];
    await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});

    let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
    console.log(`token transfer gas Used : ${transfer_result.receipt.gasUsed}`);
    expect(await this.artnft.tokenURI(tokenId, {from: newOwner})).to.equal(DUMMY_TOKEN_URI);
    let newOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: newOwner});
    console.log(`new Owner=${newOwner}, tokenURI:${newOwner_ac_result}`);
    let oldOwner_ac_result = await this.artnft.tokenURI(tokenId, {from: tokenOwner});
    console.log(`old Owner=${tokenOwner}, tokenURI:${newOwner_ac_result}`);
  });
});

