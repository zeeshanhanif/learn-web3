

console.log(Web3);
const rpcURL = "http://127.0.0.1:8545";
let web3 = new Web3(rpcURL);


let address = "0x470cB26c55628043Cf9257E4bc8fF15952C25EbB";

web3.eth.getBalance(address, (err,wei)=>{
    if(err){
        console.log("There is an error ",err);
    }
    else {
        console.log("Wei ",wei);
        let balance = web3.utils.fromWei(wei,"ether");
        console.log("Balance ",balance);
    }
});


