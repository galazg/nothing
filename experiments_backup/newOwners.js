//a BOT that will register the new owners, function "new_owner"
//It fetches getTransactionCount and supplies as parameter to the rawTx

var Web3 = require('web3');
var web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider());
web3.setProvider(new web3.providers.HttpProvider("http://34.212.105.115:8545"));  // CONNECT TO AWSNODE!!!
//console.log(web3);
var Tx = require('ethereumjs-tx');
var fs = require('fs');
// file is included here:
eval(fs.readFileSync('accounts.js')+'');
//console.log(accounts[0]);

//the following IS THE COINBASE ACCOUNT OF THE NODE RECEIVING THE TX'S
var privateKey = new Buffer('bb8113182633805ca5833beaecaa201531a5e5cbd683f05539a2ac37afe5a6b8', 'hex')
var address = '0x883d42e168ee2b6496ef442c986076c708ed2104'; //of the sender, needed to get the tx count

var txCount = web3.eth.getTransactionCount(address, function(err, res) {
  if (!err){
    console.log("Tx count: "+ res); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"

    var txCount = res;//714; //909
    var txToSend = 100;  //number of transactions to send

    for(var i=0; i<txToSend; i++){

      var newOwnerData = '0x998e11a3000000000000000000000000' + (accounts[i]["address"]).substring(2,42) + '6f776e6572000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003b9aca004c65737a656b27732070726963656c6973740000000000000000000000000000';

      var rawTx = {
        nonce: txCount+i,  //needs to be the current getTransactionCount() value!!!
        gasPrice: web3.utils.numberToHex(40000000000),  //originally 20 billion
      //gasLimit: web3.utils.numberToHex(8000000),
      //gasPrice: '0x4a817c800', //20 000 000 000 in decimal
        gasLimit: '0x80000',  //20 000 000 as I typically use when register.sendTransaction from geth
        to: '0x863ea7bbf877c8836244dedcd9c47311a8bfe697', //AccountManagement contract address in my mac
      //  from: '0x883d42e168ee2b6496ef442c986076c708ed2104',   //no need to specify, its deducted from the signature
        value: '0x00',
        data: newOwnerData,
        chainId: 1985// '0x7C1' //network 1985
      }

      var tx = new Tx(rawTx);
      tx.sign(privateKey);
      var serializedTx = (tx.serialize()).toString('hex');
      console.log('Length: '+ serializedTx.length);

      console.log("Output:");
      console.log(serializedTx);

      web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
        if (!err)
          console.log("Hash obtained: "+ hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        else {
          console.log(err);
        }
      });

    } //for


  }
  else {
    console.log(err);
  }
});
