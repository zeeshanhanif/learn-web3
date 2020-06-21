var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/1f07f4de6926451ca3a03c31df316dad');

const account1 = "0xa5360b49C2cb74C1FBC3BB80A1Be84d3d993B3e9"; // account 2 in my wallet

const privateKey1 = "C96D4F2C142BEF068324DA252F1B99687D6C13881081C621B361041E247A226E";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');

const contractAddress = "0x6898357C4D744440827Fdd067f82493B118bfC7f"

const abi = [
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
	},
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
	}
]

const contract = new web3.eth.Contract(abi, contractAddress);

console.log("Buffer 1 = ",privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: contract.methods.setAge(12).encodeABI()
      }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    //console.log("tx = ",tx);
    //console.log("serializedTx = ",serializedTx);
    //console.log("raw = ",raw);

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    });

});

contract.methods.getAge().call(function (err,result){
    console.log("Age = ",result);
});