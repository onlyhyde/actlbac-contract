// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ITBAC {
    
    event TimeAdminChanged(uint256 tokenId, bytes32 indexed previousAdmin, bytes32 indexed newAdmin);
    event TimeGranted(uint256 tokenId, address indexed account, address indexed sender);
    event TimeRevoked(uint256 tokenId, address indexed account, address indexed sender);

    function grantTime(uint256 tokenId, uint sec, address account) external;
    function revokeTime(uint256 tokenId, address account) external;
    function hasTime(uint256 tokenId, address account) external view returns (bool);

    // function getTimeAdmin(uint256 tokenId) external view returns (uint);
}
