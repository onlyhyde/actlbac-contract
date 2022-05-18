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

    constructor() ERC721("ArtNFT", "ANT") {
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        _setTokenURI(tokenId, uri);
        _grantOwner(tokenId, to);
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

    // TODO :
    // 1. Operator가 등록되었을 때, Approval 이벤트를 받아서, admin의 operator로 등록. 
}
