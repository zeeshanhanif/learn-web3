var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:8545');

const account1 = "0xAf8C299e754F7D418e47F6680036ddbf6C888EED";
const account2 = "0x76E1D4Ae3a858eB241d8DB2D77F777FCCcda55C9";

const privateKey1 = "b1dba0a03a7f7e4cbc2643d0e1fe5a32b9a8cd1b2c4324bea53e1b991a170ba3";
const privateKey2 = "60bb5c77eb1fae02bacb6d88e982f16feced788f10a019b630085e30f85b0ae5";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ",privateKey1Buffer);
console.log("Buffer 2 = ",privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('3', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx.Transaction(txObject);
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