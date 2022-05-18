// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import './ITBAC.sol';


abstract contract TBAC is Context, ITBAC {
    uint public constant INDEX_OWNER = 0;

    struct AdminData {
      address[] admin;
      uint admin_count;
    }

    struct PermissionData {
        AdminData adminList;
        mapping(address => uint) allowerExpiredTimeList;
    }

    mapping(uint256 => PermissionData) private _accessibleList;

    // TODO:
    // 1. 토큰 Mint시 onwer 등록, 민트시에만 실행
    function _grantOwner(uint256 tokenId, address ownerAccount) internal virtual {
      _setOwner(tokenId, ownerAccount);
      _countUpAdmin(tokenId);
    }

    function _setOwner(uint256 tokenId, address newOwner) internal virtual {
      _accessibleList[tokenId].adminList.admin.push(newOwner);
    }

    function _countUpAdmin(uint256 tokenId) internal virtual {
      _accessibleList[tokenId].adminList.admin_count++;
    }

    function getAdminCount(uint256 tokenId)
      public
      view 
      returns (uint)
    {
      return _accessibleList[tokenId].adminList.admin_count;
    }

    function getOwnerAccount(uint256 tokenId)
      public 
      view
      returns (address)
    {
      return _accessibleList[tokenId].adminList.admin[INDEX_OWNER];
    }

    function _grantOperator(uint256 tokenId, address operatorAccount) internal virtual {
      // TODO :
      // admin 의 갯수를 인덱스로 추가하고, admin 갯수를 하나 더 카운트 
      uint _admin_index = _accessibleList[tokenId].adminList.admin_count;
      _accessibleList[tokenId].adminList.admin[_admin_index] = operatorAccount;
      _countUpAdmin(tokenId);
    }

    function hasAdminPermission(uint256 tokenId, address account)
      public
      view
      returns (bool)
    {
      // TODO :
      // adminList를 순회하면서, account가 있는지 체크
      uint i;
      for (i=0; i < _accessibleList[tokenId].adminList.admin_count; i++) {
        if (account == _accessibleList[tokenId].adminList.admin[i]) {
          return true;
        }
      }
      return false;
    }

    function hasValidTime(uint256 tokenId, address account)
      public
      view
      returns (bool)
    {
      // TODO :
      // 1. read time
      // 2. read time > 0 && read time > block.timestamp ? true else false 
      uint expiredTime = _accessibleList[tokenId].allowerExpiredTimeList[account];
      return ((expiredTime > 0) && (expiredTime > block.timestamp)) ? true : false;
    }
    
    modifier onlyHasPermission(uint256 tokenId) {
      if ((!hasAdminPermission(tokenId, _msgSender())) && (!hasValidTime(tokenId, _msgSender()))) {
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

    // TODO :
    // 1. Operator가 등록되었을 때, admin의 operator로 등록. 

    
    modifier onlyTokenOwner(uint256 tokenId) {
      _checkOwner(tokenId);
      _;
    }

    function _checkOwner(uint256 tokenId) internal view virtual {
      _checkOwner(tokenId, _msgSender());
    }

    function _checkOwner(uint256 tokenId, address account) internal view virtual {
      if (!IsOwner(tokenId, account)) {
        revert(
          string(
            abi.encodePacked(
              "AccessControl: account ",
              Strings.toHexString(uint160(account),20),
              " is not owner address of tokenId",
              Strings.toHexString(uint256(tokenId),32)
            )
          )
        );
      }
    }

    function IsOwner(uint256 tokenId, address account)
      public
      view
      returns (bool)
    {
      return (_accessibleList[tokenId].adminList.admin[INDEX_OWNER] == account);
    }
    // TODO :
    // 1. allowerList 에 ExpiredTime 을 등록 (오직 Owner만)
    function grantTime(uint256 tokenId, uint sec, address account)
      public
      virtual
      onlyTokenOwner(tokenId)
    {
      _grantTime(tokenId, sec, account);
    }

    function _grantTime(uint256 tokenId, uint sec, address account) internal virtual {
      _accessibleList[tokenId].allowerExpiredTimeList[account] = block.timestamp + sec;
      emit TimeGranted(tokenId, account, _msgSender());
    }

    // 2. allowerList 에 ExpiredTime 을 삭제 (오직 Owner만)
    function revokeTime(uint256 tokenId, address account)
      public
      virtual
      onlyTokenOwner(tokenId)
    {
      _revokeTime(tokenId, account);
    }

    function _revokeTime(uint256 tokenId, address account) internal virtual {
      _accessibleList[tokenId].allowerExpiredTimeList[account] = 0;
      emit TimeRevoked(tokenId, account, _msgSender());
    }

    modifier onlyAdmin(uint256 tokenId) {
      _checkAdmin(tokenId);
      _;
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

    function _changeTokenOwner(uint256 tokenId, address account) internal virtual onlyAdmin(tokenId) {
      // TODO :
      // 1. clear _accessibleList[tokenId]
      // 2. set new owner
      //delete _accessibleList[tokenId].allowerExpiredTimeList;
      delete _accessibleList[tokenId];
      _setOwner(tokenId, account);
      _countUpAdmin(tokenId);
    }


    // function getTimeAdmin(uint256 tokenId) public view returns (address) {
    //   return _owner[tokenId];
    // }

    // modifier onlyHasTime(uint256 tokenId) {
    //   _checkTime(tokenId);
    //   _;
    // }




    // function _setAdmin(uint256 tokenId, address account) internal virtual {
    //   _accessibleList[tokenId].admin[account] = true;
    //   // TODO :
    //   // 1. tmp
    //   _owner[tokenId] = account;
    // }



    // function _checkTime(uint256 tokenId) internal view virtual {
    //   _checkTime(tokenId, _msgSender());
    // }

    // function _checkTime(uint256 tokenId, address account) internal view virtual {
    //   if (!hasTime(tokenId, account)) {
    //     revert(
    //       string(
    //         abi.encodePacked(
    //           "AccessControl: account ",
    //           Strings.toHexString(uint160(account), 20),
    //           " is missing permission of tokenId",
    //           Strings.toHexString(uint256(tokenId), 32)
    //         )
    //       )
    //     );
    //   }
    // }

    

    

    
}