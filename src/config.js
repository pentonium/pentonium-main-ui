export const NETWORK_ID = 3;
export const TOKEN_ADDRESS = "";
export const LOTTERY_CONTRACT_ADDRESS = "";

export const CONTRACT_ADDRESS = '0xEadBFCD40b2A839CB9C4aA3924843d82f940a312';

export const CATEGORY_CONTRACT_ADDRESS = '0x295B671a470CE84104e52a104014EB990F24c765';

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

export const CATEGORY_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "categories",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "offer_contract",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCategpries",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "offer_contract",
						"type": "address"
					}
				],
				"internalType": "struct PTMCategories.category[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_categories",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const OFFER_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "USDT",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "category",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "client_orders",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"inputs": [],
		"name": "end",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "client_adr",
				"type": "address"
			}
		],
		"name": "getClientOrders",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "serviceProvider_adr",
				"type": "address"
			}
		],
		"name": "getServiceProviderOrders",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
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
				"name": "id",
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
						"name": "id",
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
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "service_provider_orders",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setCategory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "start",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
	}
];

export const ORDER_CONTRACT_ABI = [
	{
		"inputs": [],
		"name": "acceptDelivery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_service_provider_public",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_service_provider_private",
				"type": "string"
			}
		],
		"name": "acceptOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cancelOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_service_provider",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_client",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_client_public",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_client_private",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfs_hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
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
				"internalType": "string",
				"name": "_ipfs_hash",
				"type": "string"
			}
		],
		"name": "deliver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dispute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disputeAccept",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rejectOrder",
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
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "client",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getClientRequirements",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getServiceProviderRequirements",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "order_created",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "order_status",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "service_provider",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];