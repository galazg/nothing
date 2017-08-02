//Calculate the time it takes to sign a transaction (but doesn´t send the tx's)
//Try different data sizes

var μs = require('microseconds');
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());
var Tx = require('ethereumjs-tx');

var privateKey = new Buffer('bb8113182633805ca5833beaecaa201531a5e5cbd683f05539a2ac37afe5a6b8', 'hex')
var txCount = 94; //not used here
var registerData = '0x'
var samples = 10000;
var power = 32;

for(var j=0; j<power; j++){  // data size is 2ˆpower bytes

  registerData = '0x';

  for(var k=0; k<2**j; k++){   //make the data length double every time
    registerData += '0000000000000000';
  }

  var acum=0;
  for(var i=0; i<samples; i++){    //samples of each data size

    var rawTx = {
      nonce: txCount+i,  //needs to be the current getTransactionCount() value!!!
      gasPrice: web3.utils.numberToHex(20000000000),
      gasLimit: web3.utils.numberToHex(20000000),
      to: '0x863ea7bbf877c8836244dedcd9c47311a8bfe697', //AccountManagement contract address in my mac
      value: '0x00',
      data: registerData,
      chainId: 1985// '0x7C1' //network 1985
    }

    var before = μs.now();
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = (tx.serialize()).toString('hex');
    var time = μs.since(before); // time passed
    var parsed = μs.parse(time);
    acum += time;

  } //for

  var acumParsed = μs.parse(acum/samples);
  console.log('Length: '+((registerData.length-2)/2).toString() +" Time: " + (acumParsed.milliseconds + acumParsed.microseconds/1000).toString());

} //for
