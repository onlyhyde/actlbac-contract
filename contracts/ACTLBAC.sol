// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import './IACTLBAC.sol';


abstract contract ACTLBAC is Context, IACTLBAC {
    address _contractOwner;

    struct AccessControlData {
        address _tokenOwner;
        address[] _tokenAdmin;
        mapping(address => uint) _actl;
    }

    // Mapping from token ID to AccessControlData
    mapping(uint256 => AccessControlData[]) private _accessibleList;

    // Mapping from token ID to index of the owner access control time list
    mapping(uint256 => uint256) private _ownedACTLIndex;

    address[] private _whitelist;

    modifier onlyContractOwner() {
      _checkContractOwner(_msgSender());
      _;
    }

    modifier onlyTokenOwner(uint256 tokenId) {
      _checkOwner(tokenId, _msgSender());
      _;
    }

    modifier onlyTokenAdmin(uint256 tokenId) {
      _checkAdmin(tokenId, _msgSender());
      _;
    }

    modifier onlyHasPermission(uint256 tokenId) {
      _checkPermission(tokenId, _msgSender());
      _;
    }

    function _checkContractOwner(address from) internal view virtual {
      if (!(_contractOwner==from)) {
        revert(
          string(
            abi.encodePacked(
              "[ACTL]: account ",
              Strings.toHexString(uint160(from),20),
              " is not an owner address of contract"
            )
          )
        );
      }
    }

    function _checkOwner(uint256 tokenId, address from) internal view virtual {
      if (!isTokenOwner(tokenId, from)) {
        revert(
          string(
            abi.encodePacked(
              "[ACTL]: account ",
              Strings.toHexString(uint160(from), 20),
              " is not an owner of tokenId",
              Strings.toHexString(uint256(tokenId), 32)
            )
          )
        );
      }
    }

    function _checkAdmin(uint256 tokenId, address from) internal view virtual {
      if ((!isTokenOwner(tokenId, from)) && (!isTokenAdmin(tokenId, from))) {
        revert(
          string(
            abi.encodePacked(
              "[ACTL]: account ",
              Strings.toHexString(uint160(from), 20),
              " is not an admin of tokenId",
              Strings.toHexString(uint256(tokenId), 32)
            )
          )
        );
      }
    }

    function _checkPermission(uint256 tokenId, address from) internal view virtual {
      if ((!isTokenOwner(tokenId, from)) && (!isTokenAdmin(tokenId, from)) && (!hasValidTime(tokenId, from))) {
        revert(
          string(
            abi.encodePacked(
              "[ACTL]: account ",
              Strings.toHexString(uint160(from), 20),
              " is missing permission of tokenId",
              Strings.toHexString(uint256(tokenId), 32)
            )
          )
        );
      }
    }

    function _ACTLIndexOf(uint256 tokenId) internal view returns (uint256) {
      return _ownedACTLIndex[tokenId]-1;
    }

    function _setConractOwner(address contractOwner) internal {
      _contractOwner = contractOwner;
    }

    function _grantTokenOwner(uint256 tokenId, address ownerAccount) internal virtual {
      AccessControlData storage newACTL = _accessibleList[tokenId].push();
      newACTL._tokenOwner = ownerAccount;
    }

    function _changeTokenOwner(uint256 tokenId, address ownerAccount) internal virtual {
      _grantTokenOwner(tokenId, ownerAccount);
    }

    function _isExistAdmin(uint256 tokenId, address to) internal virtual returns (bool) {
      if (_accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin.length > 0) {
        uint i;
        for (i=0; i < _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin.length; i++) {
          if (to == _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin[i]) {
            return true;
          }
        }
      }
      return false;
    }

    function _grantAdmin(uint256 tokenId, address to) internal virtual onlyTokenOwner(tokenId) {
      if (!_isExistAdmin(tokenId, to)) {
        _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin.push(to);
      }
    }

    function _safeGrantAdmin(uint256 tokenId, address to) internal virtual onlyTokenOwner(tokenId) {
      if (isExistOf(to)) {
        _grantAdmin(tokenId, to);
      }
    }

    function _revokeAdmin(uint256 tokenId, address to) internal virtual {
      if (_accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin.length > 0) {
        uint i;
        for (i=0; i < _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin.length; i++) {
          if (to == _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin[i]) {
            uint lastIndex = _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin.length - 1;
            _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin[i] = 
              _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin[lastIndex];
            delete _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenAdmin[lastIndex];
          }
        }
      }
    }

    function _grantTime(uint256 tokenId, address to, uint sec) internal virtual {
      uint256 actlIndex = _ACTLIndexOf(tokenId);
      _accessibleList[tokenId][actlIndex]._actl[to] = block.timestamp + sec;
    }

    function _expandTime(uint256 tokenId, address to, uint sec) internal virtual {
      uint256 actlIndex = _ACTLIndexOf(tokenId);
      uint prevTime = _accessibleList[tokenId][actlIndex]._actl[to];
      _accessibleList[tokenId][actlIndex]._actl[to] = prevTime + sec;
    }

    function _revokeTime(uint256 tokenId, address to) internal virtual {
      uint256 actlIndex = _ACTLIndexOf(tokenId);
      _accessibleList[tokenId][actlIndex]._actl[to] = block.timestamp;
    }

    function _addACTLEnumeration(uint256 tokenId) private {
      uint256 length = _ownedACTLIndex[tokenId];
      _ownedACTLIndex[tokenId] = length+1;
    }

    function isTokenOwner(uint256 tokenId, address account)
      public
      view
      returns (bool) {
      return (_accessibleList[tokenId][_ACTLIndexOf(tokenId)]._tokenOwner == account) ? true : false;
    }

    function isTokenAdmin(uint256 tokenId, address account)
      public
      view
      returns (bool) {
      uint256 actlIndex = _ACTLIndexOf(tokenId);
      if (_accessibleList[tokenId][actlIndex]._tokenAdmin.length > 0) {
        uint i;
        for (i=0; i < _accessibleList[tokenId][actlIndex]._tokenAdmin.length; i++) {
          if (account == _accessibleList[tokenId][actlIndex]._tokenAdmin[i]) {
            return true;
          }
        }
      }
      return false;
    }

    function hasValidTime(uint256 tokenId, address account)
      public
      view
      returns (bool) {
      uint256 actlIndex = _ACTLIndexOf(tokenId);
      uint expiredTime = _accessibleList[tokenId][actlIndex]._actl[account];
      return ((expiredTime > 0) && (expiredTime > block.timestamp)) ? true : false;
    }

    function create_actl(
        uint256 tokenId, 
        address owner
    ) public
      onlyContractOwner {
      _grantTokenOwner(tokenId, owner);
      _addACTLEnumeration(tokenId);
    }

    function grant_time(
        uint256 tokenId,
        address to,
        uint sec
    ) public 
      onlyTokenOwner(tokenId) {
      _grantTime(tokenId, to, sec);
      emit TimeGranted(tokenId, to, _msgSender());
    }

    function modify_time(
        uint256 tokenId,
        address to,
        uint sec
    ) public 
      onlyTokenOwner(tokenId) {
      _expandTime(tokenId, to, sec);
      emit TimeGranted(tokenId, to, _msgSender());
    }

    function revoke_time(
        uint256 tokenId,
        address to
    ) public
      onlyTokenOwner(tokenId) {
      _revokeTime(tokenId, to);
      emit TimeRevoked(tokenId, to, _msgSender());
    }

    function timeOf(
      uint256 tokenId,
      address to
    ) public view virtual returns (uint) {
      return _accessibleList[tokenId][_ACTLIndexOf(tokenId)]._actl[to];
    }

    function is_access_permission(
        uint256 tokenId,
        address to
    ) public view virtual returns (bool) {
      return (isTokenOwner(tokenId, to) || isTokenAdmin(tokenId, to) || hasValidTime(tokenId, to)) ? true : false;
    }

    function _change_actl_owner(
        uint256 tokenId,
        address to
    ) internal
      virtual 
      onlyTokenAdmin(tokenId) {
      _changeTokenOwner(tokenId, to);
      _addACTLEnumeration(tokenId);
    }

    function isExistOf(address to) internal view returns (bool) {
      if (_whitelist.length > 0) {
        uint i;
        for (i=0; i < _whitelist.length; i++) {
          if (to == _whitelist[i]) {
            return true;
          }
        }
      }
      return false;
    }

    function add_whitelist(
        address to
    ) public
      virtual
      onlyContractOwner {
      if (!isExistOf(to)) {
        _whitelist.push(to);
      }
    }

    function remove_whitelist(
        address to
    ) public 
      virtual 
      onlyContractOwner {
      uint i;
      for (i=0; i < _whitelist.length; i++) {
        if (to == _whitelist[i]) {
          uint lastIndex = _whitelist.length - 1;
          _whitelist[i] = _whitelist[lastIndex];
          delete _whitelist[lastIndex];
        }
      }
    }
}