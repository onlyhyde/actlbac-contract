// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./TBAC.sol";

contract ArtNFT is ERC721, ERC721URIStorage, Ownable, TBAC {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _metadataHash;

    constructor() ERC721("ArtNFT", "ANT") {
    }

    function safeMint(address to, string memory uri, string memory hash) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        _setTokenURI(tokenId, uri);
        _grantOwner(tokenId, to);
        _setMetadataHash(tokenId, hash);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        onlyHasPermission(tokenId)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function allowPermission(uint256 tokenId, uint sec, address allowedAccount) 
        public  
        onlyTokenOwner(tokenId)
    {
        grantTime(tokenId, sec, allowedAccount);
    }

    function safeTransferFrom(
      address from,
      address to,
      uint256 tokenId
    ) public virtual override {
      super.safeTransferFrom(from, to, tokenId);
      _changeTokenOwner(tokenId, to);
    }

    function _setMetadataHash(uint256 tokenId, string memory hash) private {
        require(bytes(hash).length > 0);
        _metadataHash[tokenId] = hash;
    }

    function isValidHash(uint256 tokenId, string memory hash) public view onlyHasPermission(tokenId) returns(bool) {
        require(bytes(hash).length > 0);

        string memory _tokenMetaHash = _metadataHash[tokenId];
        return keccak256(abi.encodePacked(_tokenMetaHash)) == keccak256(abi.encodePacked(hash));
    }

    // TODO :
    // 1. Operator가 등록되었을 때, Approval 이벤트를 받아서, admin의 operator로 등록. 
}
