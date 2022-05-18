// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./TokenIdAccessControl.sol";

contract ArtNFT is ERC721, ERC721URIStorage, Ownable, TokenIdAccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant VIEWER_ROLE = keccak256("VIEWER_ROLE");

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ArtNFT", "ANT") {
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        _setTokenURI(tokenId, uri);

        _grantRole(tokenId, DEFAULT_ADMIN_ROLE, to);
        _grantRole(tokenId, VIEWER_ROLE, to);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        onlyRole(tokenId, VIEWER_ROLE)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function allowPermission(uint256 tokenId, address allowedAccount) 
        public  
        onlyRole(tokenId, DEFAULT_ADMIN_ROLE)
    {
        grantRole(tokenId, VIEWER_ROLE, allowedAccount);
    }

    function safeTransferFrom(
      address from,
      address to,
      uint256 tokenId
    ) public virtual override {
      super.safeTransferFrom(from, to, tokenId);
      
      _grantRole(tokenId, DEFAULT_ADMIN_ROLE, to);
      _revokeRole(tokenId, DEFAULT_ADMIN_ROLE, from);
      _grantRole(tokenId, VIEWER_ROLE, to);
      _revokeRole(tokenId, VIEWER_ROLE, from);
    }
}
