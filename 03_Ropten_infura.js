console.log(Web3);
const rpcURL = "https://ropsten.infura.io/v3/1f07f4de6926451ca3a03c31df316dad";
let web3 = new Web3(rpcURL);


let address = "0xa5360b49C2cb74C1FBC3BB80A1Be84d3d993B3e9";

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


