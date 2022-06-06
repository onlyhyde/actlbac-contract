// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IACTLBAC {

    /**
     * @dev Emitted when the time of `tokenId` token is granted from `from` to `to`.
     */
    event TimeGranted(uint256 indexed tokenId, address indexed to, address indexed from);
    
    /**
     * @dev Emitted when the time of `tokenId` token is revoked about `to` by `from`.
     */
    event TimeRevoked(uint256 indexed tokenId, address indexed to, address indexed from);

    /**
     * @dev 'tokenId'에 대한 접근제어시간목록(actl)을 생성하고, owner를 관리자로 설정.
     *
     * Requirements:
     *
     * - `tokenId` token이 존재하고, `owner`에 의해 소유된 토큰이어야 한다.
     * - `owner` tokenId의 owner
     *
     */
    function create_actl(
        uint256 tokenId, 
        address owner
    ) external;

    /**
     * @dev 'tokenId'에 대한 접근제어시간목록(actl)에 'to'주소를 등록하고 'sec'만큼 시간 부여.
     *
     * Requirements:
     *
     * - `tokenId` token이 존재해야 하고, 메시지 센더가 tokenId의 소유권자여야 한다.
     * - `to`    tokenId의 메타데이터에 접근을 허가할 주소.
     * - `sec`    접근을 허가할 시간 (초단위).
     *
     */
    function grant_time(
        uint256 tokenId,
        address to,
        uint sec
    ) external;

    /**
     * @dev 'tokenId'에 대한 접근제어시간목록(actl)에 등록된 'to'주소에 'sec'만큼 추가 시간 부여.
     *
     * Requirements:
     *
     * - `tokenId` token이 존재해야 하고, 메시지 센더가 tokenId의 소유권자여야 한다.
     * - `to`    tokenId의 메타데이터에 접근을 허가할 주소.
     * - `sec`    접근을 허가할 시간 (초단위).
     *
     */
    function modify_time(
        uint256 tokenId,
        address to,
        uint sec
    ) external;

    /**
     * @dev 'tokenId'에 대한 접근제어시간목록(actl)에 등록된 'to'주소에 부여된 시간 삭제.
     *
     * Requirements:
     *
     * - `tokenId` token이 존재해야 하고, 메시지 센더가 tokenId의 소유권자여야 한다.
     * - `to`    tokenId의 메타데이터에 접근을 허가할 주소.
     *
     */
    function revoke_time(
        uint256 tokenId,
        address to
    ) external;

    /**
     * @dev 'tokenId'에 대한 메타데이터 접근권한이 'to'가 가지고 있는지 확인.
     *
     * Requirements:
     *
     * - `tokenId` token이 존재해야 한다.
     * - `to`    tokenId의 메타데이터에 대한 접근 권한을 체크할 주소.
     *
     */
    function is_access_permission(
        uint256 tokenId,
        address to
    ) external returns (bool);

    /**
     * @dev 'tokenId'에 대한 actl의 onwer가 'to'로 변경.
     *
     * Requirements:
     *
     * - `tokenId` token이 존재해야 하고, 메시지 센더가 tokenId의 소유권자이거나,
     *             operator, approved address여야 한다.
     * - `to`      tokenId의 새로운 owner 주소.
     *
     */
    function change_actl_owner(
        uint256 tokenId,
        address to
    ) external;

    /**
     * @dev 'to'주소를 whitelist로 등록.
     *
     * Requirements:
     *
     * - `to`       whitelist에 등록할 알려진 거래소 contract 주소
     *
     */
    function add_whitelist(
        address to
    ) external;

    /**
     * @dev 'to'주소를 whitelist에서 삭제.
     *
     * Requirements:
     *
     * - `to`       whitelist에서 삭제할 알려진 거래소 contract 주소
     *
     */
    function remove_whitelist(
        address to
    ) external;
}
