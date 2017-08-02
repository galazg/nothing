// simplest version, but works!  Sends a "register" tx
//one account only, can send multiples tx at once,
//but the tx count must be set manually!!

var μs = require('microseconds');
var Web3 = require('web3');
var web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider());
web3.setProvider(new web3.providers.HttpProvider("http://34.212.105.115:8545"));
//console.log(web3);

var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('bb8113182633805ca5833beaecaa201531a5e5cbd683f05539a2ac37afe5a6b8', 'hex')

// var txCount = web3.eth.getTransactionCount('0x883d42e168ee2b6496ef442c986076c708ed2104', function(err, res) {
//   if (!err)
//     console.log("Tx count: "+ res); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
//   else {
//     console.log(err);
//   }
// });
var txCount = 5; //909
var txToSend = 1;  //number of transactions to send
var registerData = '0x87e370b3000000000000000000000000883d42e168ee2b6496ef442c986076c708ed210464380000000000000000000000000000000000000000000000000000000000004465766963652038000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000015265640000000000000000000000000000000000000000000000000000000000';


for(var i=0; i<txToSend; i++){

var rawTx = {
  nonce: txCount+i,  //needs to be the current getTransactionCount() value!!!
  gasPrice: web3.utils.numberToHex(1600000000000),  //originally 20 billion
  gasLimit: web3.utils.numberToHex(20000000),
//gasPrice: '0x4a817c800', //20 000 000 000 in decimal
//gasLimit: '0x1312d00',  //20 000 000 as I typically use when register.sendTransaction from geth
  to: '0x863ea7bbf877c8836244dedcd9c47311a8bfe697', //AccountManagement contract address in my mac
//  from: '0x883d42e168ee2b6496ef442c986076c708ed2104',   //no need to specify, its deducted from the signature
  value: 0,//'0x00',
  data: registerData,
  chainId: 1985// '0x7C1' //network 1985
}

//am.register.getData(fer,"d8","Device 8",["Red"])

var before = μs.now();

var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = (tx.serialize()).toString('hex');

console.log('Length: '+ serializedTx.length);

var time = μs.since(before); // time passed
var parsed = μs.parse(time);

console.log("Output:");
console.log(serializedTx);
console.log("Time: " + (parsed.milliseconds + parsed.microseconds/1000).toString());



web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
  if (!err)
    console.log("Hash obtained: "+ hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
  else {
    console.log(err);
  }
});


} //for
