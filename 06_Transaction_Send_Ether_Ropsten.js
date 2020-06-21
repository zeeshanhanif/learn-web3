var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/1f07f4de6926451ca3a03c31df316dad');

const account1 = "0xa5360b49C2cb74C1FBC3BB80A1Be84d3d993B3e9"; // account 2 in my wallet
const account2 = "0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5"; // account 1 in my wallet

const privateKey1 = "C96D4F2C142BEF068324DA252F1B99687D6C13881081C621B361041E247A226E";
const privateKey2 = "54AFAABE45597A77DAB42A19D3AB902262ECB033FD992C99583ED90432AA6B52";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ",privateKey1Buffer);
console.log("Buffer 2 = ",privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
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