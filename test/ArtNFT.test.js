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

  // it('multiple minting test - the owner of nft should be correct', async function () {
  //   let step;
  //   let accountIndex; // Max is 9
  //   let totalUsedGas;
  //   const MAX_ACCOUNT = 9;
  //   const MAX_TRY = 500;
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
  //   const MAX_TRY = 1000;
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
  //   const MAX_TRY = 2000;
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
  //   const MAX_TRY = 3000;
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
  //   const MAX_TRY = 4000;
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
  //   const MAX_TRY = 5000;
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
  //   const MAX_TRY = 6000;
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
  //   const MAX_TRY = 7000;
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
  //   const MAX_TRY = 8000;
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
  //   const MAX_TRY = 9000;
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
  //   const MAX_TRY = 10000;
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



  it('tokenUri access test - token owner should be allowed', async function () {
    let step;
    let accountIndex;
    const MAX_ACCOUNT = 9;
    const MAXTRY = 10;
    const DUMMY_TOKEN_URI = "ipfs://ekwnklfkeewiofwnelkfnwlioghjkwlefnklekjl";
    for (step=0, accountIndex=0; step < MAXTRY ; step++ ) {
      await this.artnft.safeMint(accounts[accountIndex], DUMMY_TOKEN_URI, {from: owner});
      let result = await this.artnft.tokenURI(step, {from: accounts[accountIndex]});
      console.log(`result[${step}] : ${result}`);
      expect(result).to.equal(DUMMY_TOKEN_URI);
      if (accountIndex == MAX_ACCOUNT) {
        accountIndex = 0;
      } else {
        accountIndex++;
      }
    }
  });

  it('tokenUri access reject test - others who has not permission should be allowed', async function () {
    let tokenId = 0;
    let tokenOwner = accounts[1];
    let other = accounts[2];
    const DUMMY_TOKEN_URI = "ipfs://ekwnklfkeewiofwnelkfnwlioghjkwlefnklekjl";
    let mint_result = await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
    console.log(`tokenOwner : ${tokenOwner}, other : ${other}`);
    let result = await this.artnft.tokenURI(tokenId, {from: other});
    console.log(`result[${other}] = ${result}`);
    expect(result).to.equal(DUMMY_TOKEN_URI);
    console.log(`one time minting gas Used : ${mint_result.receipt.gasUsed}`);
  });

  // it('token transfer', async function() {
  //   let tokenId = 0;
  //   let tokenOwner = accounts[1];
  //   let newOwner = accounts[2];
  //   const DUMMY_TOKEN_URI = "www.google.com";
  //   await this.artnft.safeMint(tokenOwner, DUMMY_TOKEN_URI, {from: owner});
  //   let transfer_result = await this.artnft.safeTransferFrom(tokenOwner, newOwner, tokenId, {from: tokenOwner});
  //   console.log(`one time token transfer gas Used : ${transfer_result.receipt.gasUsed}`);
  //   expect(await this.artnft.tokenURI(tokenId, {from: newOwner})).to.equal(DUMMY_TOKEN_URI);
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
});

