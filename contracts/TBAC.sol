// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import './ITBAC.sol';


abstract contract TBAC is Context, ITBAC {
    mapping(uint256 => address) private _owner;

    struct PermissionData {
        mapping(address => bool) admin;
        mapping(address => uint) permissioned;
    } 

    mapping(uint256 => PermissionData) private _accessibleList;

    modifier onlyHasPermission(uint256 tokenId) {
      if ((!hasAdminPermission(tokenId, _msgSender())) && (!hasTime(tokenId, _msgSender()))) {
        revert(
          string(
            abi.encodePacked(
              "AccessControl: account ",
              Strings.toHexString(uint160(_msgSender()), 20),
              " is missing permission of tokenId",
              Strings.toHexString(uint256(tokenId), 32)
            )
          )
        );
      }
      _;
    }

    modifier onlyAdmin(uint256 tokenId) {
        _checkAdmin(tokenId);
        _;
    }

    modifier onlyHasTime(uint256 tokenId) {
      _checkTime(tokenId);
      _;
    }

    function hasAdminPermission(uint256 tokenId, address account) public view returns (bool) {
      return _accessibleList[tokenId].admin[account];
    }

    function _checkAdmin(uint256 tokenId) internal view virtual {
        _checkAdmin(tokenId, _msgSender());
    }

    function _checkAdmin(uint256 tokenId, address account) internal view virtual {
        if (!hasAdminPermission(tokenId, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        Strings.toHexString(uint160(account), 20),
                        " is missing permission of tokenId",
                        Strings.toHexString(uint256(tokenId), 32)
                    )
                )
            );
        }
    }

    function _setAdmin(uint256 tokenId, address account) internal virtual {
      _accessibleList[tokenId].admin[account] = true;
      // TODO :
      // 1. tmp
      _owner[tokenId] = account;
    }

    function hasTime(uint256 tokenId, address account) public view returns (bool) {
      // TODO :
      // 1. read time
      // 2. read time > 0 && read time > block.timestamp ? true else false 
      uint expiredTime = _accessibleList[tokenId].permissioned[account];
      return ((expiredTime > 0) && (expiredTime > block.timestamp)) ? true : false;
    }

    function _checkTime(uint256 tokenId) internal view virtual {
      _checkTime(tokenId, _msgSender());
    }

    function _checkTime(uint256 tokenId, address account) internal view virtual {
      if (!hasTime(tokenId, account)) {
        revert(
          string(
            abi.encodePacked(
              "AccessControl: account ",
              Strings.toHexString(uint160(account), 20),
              " is missing permission of tokenId",
              Strings.toHexString(uint256(tokenId), 32)
            )
          )
        );
      }
    }

    function grantTime(uint256 tokenId, uint sec, address account) public virtual onlyAdmin(tokenId) {
      _grantTime(tokenId, sec, account);
    }

    function _grantTime(uint256 tokenId, uint sec, address account) internal virtual {
        // if (!hasRole(tokenId, role, account)) {
        //     _roles[tokenId][role].members[account] = true;
        //     emit RoleGranted(tokenId, role, account, _msgSender());
        // }
        // TODO :
        // 1. blockTime + sec 
        // 2. emit TimeGranted
        _accessibleList[tokenId].permissioned[account] = block.timestamp + sec;
        emit TimeGranted(tokenId, account, _msgSender());
    }

    function revokeTime(uint256 tokenId, address account) public virtual onlyAdmin(tokenId) {
      _revokeTime(tokenId, account);
    }

    function _revokeTime(uint256 tokenId, address account) internal virtual {
        // if (hasRole(tokenId, role, account)) {
        //     _roles[tokenId][role].members[account] = false;
        //     emit RoleRevoked(tokenId, role, account, _msgSender());
        // }
        _accessibleList[tokenId].permissioned[account] = 0;
        emit TimeRevoked(tokenId, account, _msgSender());
    }

    function _changeTokenOwner(uint256 tokenId, address account) internal virtual onlyAdmin(tokenId) {
      // TODO :
      // 1. clear _accessibleList[tokenId]
      // 2. set new owner
      delete _accessibleList[tokenId].admin[getTimeAdmin(tokenId)];
      _setAdmin(tokenId, account);
    }

    function getTimeAdmin(uint256 tokenId) public view returns (address) {
      return _owner[tokenId];
    }
}