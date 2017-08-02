var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());
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
var txCount = 11;
var registerData = '0x87e370b3000000000000000000000000883d42e168ee2b6496ef442c986076c708ed210464380000000000000000000000000000000000000000000000000000000000004465766963652038000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000015265640000000000000000000000000000000000000000000000000000000000';



var rawTx = {
  nonce: txCount,  //needs to be the current getTransactionCount() value!!!
  gasPrice: web3.utils.numberToHex(20000000000),
  gasLimit: web3.utils.numberToHex(20000000),
//gasPrice: '0x4a817c800', //20 000 000 000 in decimal
//gasLimit: '0x1312d00',  //20 000 000 as I typically use when register.sendTransaction from geth
  to: '0x863ea7bbf877c8836244dedcd9c47311a8bfe697', //AccountManagement contract address in my mac
//  from: '0x883d42e168ee2b6496ef442c986076c708ed2104',
  value: '0x00',
  data: registerData,
  chainId: 1985// '0x7C1' //network 1985
}

//am.register.getData(fer,"d8","Device 8",["Red"])


var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

console.log("Output:");
console.log(serializedTx.toString('hex'));

//console.log("Expected output\n"+"0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f");


web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
  if (!err)
    console.log("Hash obtained: "+ hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
  else {
    console.log(err);
  }
});
