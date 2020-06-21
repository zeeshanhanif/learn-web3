
const Web3 = require("web3");

console.log(Web3);

const rpcURL = "http://127.0.0.1:8545";

let web3 = new Web3(rpcURL);

console.log("web3 instance = ", web3);

let address = "0x76E1D4Ae3a858eB241d8DB2D77F777FCCcda55C9";

web3.eth.getBalance(address, (err, wei)=>{
    console.log("Wei ",wei);
    let balance = web3.utils.fromWei(wei,"ether");
    console.log("Balance ",balance);
});
