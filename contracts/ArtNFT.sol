// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ACTLBAC.sol";

contract ArtNFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable, ACTLBAC {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ArtNFT", "ANT") {
        _setConractOwner(_msgSender());
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        create_actl(tokenId, to);
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

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function safeTransferFrom(
      address from,
      address to,
      uint256 tokenId
    ) public virtual override {
      super.safeTransferFrom(from, to, tokenId);
      _change_actl_owner(tokenId, to);
    }

    function approve(
      address to,
      uint256 tokenId
    ) public virtual override {
      super.approve(to, tokenId);
      _safeGrantAdmin(tokenId, to);
    }

    function setApprovalForAll(
      address operator, 
      bool approved
    ) public virtual override {
      super.setApprovalForAll(operator, approved);
      uint256 balance = ERC721.balanceOf(_msgSender());
      uint256 i;
      if (approved) {
        for (i=0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(_msgSender(), i);
            _safeGrantAdmin(tokenId, operator);
        }
      } else {
        for (i=0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(_msgSender(), i);
            _revokeAdmin(tokenId, operator);
        }
      }
    }
}
