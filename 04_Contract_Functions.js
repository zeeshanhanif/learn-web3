console.log(Web3);
const rpcURL = "https://ropsten.infura.io/v3/1f07f4de6926451ca3a03c31df316dad";
let web3 = new Web3(rpcURL);

let address = "0x6898357C4D744440827Fdd067f82493B118bfC7f";

let abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "doSomeWork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
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

const contract = new web3.eth.Contract(abi, address);

//console.log("Contract ",contract);
//console.log("Methods ",contract.methods);
//console.log("getAge ",contract.methods.getAge);
//console.log("doSomeWork ",contract.methods.doSomeWork);

contract.methods.getAge().call(function (err,result){
    console.log("Age = ",result);
});

contract.methods.doSomeWork().call(function (err,result){
    console.log("work = ",result);
});

