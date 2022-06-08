// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./rbac.sol";

contract ArtNFT is ERC721, ERC721URIStorage, RBACSC {
    using Counters for Counters.Counter;

    address private _owner;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ArtNFT", "ANT") RBACSC("ArtNFT") {
        _owner = msg.sender;
    }

    function safeMint(address to, string memory uri) public {
        require(msg.sender == _owner);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        if (!isExistOf(to)) {
            addUser(to, "USER_ROLE", "");
        }
    }

    function isExistOf(address to) public returns (bool) {
        if (getNoOfUsers() > 0) {
            address[] memory userlist = getUsers();
            uint i;
            for (i=0; i < userlist.length; i++) {
                if (to == userlist[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require((hasRole(USER_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender)), "Caller does not have the USER role");
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
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
    }

    function approve(
      address to,
      uint256 tokenId
    ) public virtual override {
      super.approve(to, tokenId);
    //   if (!isExistOf(to)) {
    //     addUser(to, "USER_ROLE", "");
    //   }
    }

    function setApprovalForAll(
      address operator, 
      bool approved
    ) public virtual override {
      super.setApprovalForAll(operator, approved);
    //   uint256 balance = ERC721.balanceOf(_msgSender());
    //   uint256 i;
    //   if (approved) {
    //     if (!isExistOf(operator)) {
    //             addUser(operator, "USER_ROLE", "");
    //         }
    //   } else {
    //     removeUser(operator);
    //   }
    }
}
