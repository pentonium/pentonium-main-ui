export const NETWORK_ID = 3;
export const TOKEN_ADDRESS = "";
export const LOTTERY_CONTRACT_ADDRESS = "";

export const CONTRACT_ADDRESS = '0xEadBFCD40b2A839CB9C4aA3924843d82f940a312';

export const CONTRACT_ABI =  [	{
    "inputs": [
        {
            "internalType": "string",
            "name": "ipfs_hash",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "thumbnail",
            "type": "string"
        },
        {
            "internalType": "address",
            "name": "service_provider",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        }
    ],
    "name": "create",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        }
    ],
    "name": "deleteGig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "client_public",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "client_private",
            "type": "string"
        }
    ],
    "name": "placeOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "ipfs_hash",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "thumbnail",
            "type": "string"
        },
        {
            "internalType": "address",
            "name": "service_provider",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        }
    ],
    "name": "update",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "gigs",
    "outputs": [
        {
            "internalType": "string",
            "name": "ipfs_hash",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "thumbnail",
            "type": "string"
        },
        {
            "internalType": "address",
            "name": "service_provider",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "next",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "prev",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_start",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "count",
            "type": "uint256"
        }
    ],
    "name": "read",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "string",
                    "name": "ipfs_hash",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "thumbnail",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "service_provider",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "next",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "prev",
                    "type": "uint256"
                }
            ],
            "internalType": "struct PTMOffers.gig[]",
            "name": "gig_list",
            "type": "tuple[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}
];