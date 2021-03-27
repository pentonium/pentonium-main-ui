pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;
import './Order.sol';

contract PTMOffers {
    struct gig {
        string ipfs_hash;
        string thumbnail;
        address service_provider;
        uint256 price;
        uint256 next;
        uint256 prev;
    }

    mapping(uint256 => gig) public gigs;
    mapping(address => address[]) client_orders;
    mapping(address => address[]) service_provider_orders;
    uint256 start;
    uint256 end;

    IERC20 USDT;

    constructor() {
        start = 0;
        end = 0;
        USDT = IERC20(0x8b5D9502938FDCA4a56047cb4D42314550e9B8E2);
    }

    function create(
        string memory ipfs_hash,
        string memory thumbnail,
        address service_provider,
        uint256 price,
        uint256 next,
        uint256 prev
    ) public {
        end++;

        gigs[end].ipfs_hash = ipfs_hash;
        gigs[end].thumbnail = thumbnail;
        gigs[end].service_provider = service_provider;
        gigs[end].price = price;
        gigs[end].next = end;
        gigs[end].prev = end - 1;
    }

    function read(
        uint256 _start,
        uint256 count,
        uint256 page
    ) public returns (gig[] memory gig_list) {
        uint256 next = _start;

        for (uint256 i = 0; i < count; i++) {
            gig_list[i] = gigs[next];
            next = gigs[next].next;
        }

        return gig_list;
    }

    function update(
        string memory ipfs_hash,
        string memory thumbnail,
        address service_provider,
        uint256 price,
        uint256 id
    ) public {
        gigs[id].ipfs_hash = ipfs_hash;
        gigs[id].thumbnail = thumbnail;
        gigs[id].service_provider = service_provider;
        gigs[id].price = price;
    }

    function deleteGig(uint256 id) public {
        gigs[gigs[id].next].prev = gigs[id].prev;
        gigs[gigs[id].prev].next = gigs[id].next;

        delete gigs[id];
    }

    function placeOrder(
        uint256 id,
        string memory client_public,
        string memory client_private
    ) public {
        gig memory selected_gig = gigs[id];

        PTMOrderEscrow order = new PTMOrderEscrow();

        client_orders[msg.sender].push(address(order));
        service_provider_orders[msg.sender].push(address(order));

        USDT.transferFrom(msg.sender, address(order), selected_gig.price);

        order.create(
            selected_gig.service_provider,
            msg.sender,
            client_public,
            client_private,
            selected_gig.ipfs_hash,
            selected_gig.price
        );
    }
}