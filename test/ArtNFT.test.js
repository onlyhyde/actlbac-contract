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

  it('minting test - the owner of nft should be correct', async function () {
    let step;
    const maxTry = 10;
    for (step=0; step < maxTry ; step++ ) {
      await this.artnft.safeMint(accounts[2], {from: owner});
      expect(await this.artnft.ownerOf(step)).to.equal(accounts[2]);
    }
  });
});

