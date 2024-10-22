export const CONTRACT_ADDRESS = "0xa88e2B5615Ff803768F787dD3e7e24fc231C0A4b";
export const CONTRACT_ABI = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "studentAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "institutionAddress",
					"type": "address"
				}
			],
			"name": "CertificateIssued",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_studentAddress",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_courseName",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_issueDate",
					"type": "uint256"
				}
			],
			"name": "issueCertificate",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "certificates",
			"outputs": [
				{
					"internalType": "address",
					"name": "studentAddress",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "institutionAddress",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "courseName",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "issueDate",
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
					"name": "_studentAddress",
					"type": "address"
				}
			],
			"name": "verifyCertificate",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
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
