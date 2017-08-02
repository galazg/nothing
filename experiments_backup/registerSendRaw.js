//a BOT that will send tx using 100 private keys
//It fetches getTransactionCount and supplies as parameter to the rawTx
//current state: registers devices of personal.listAccounts[0] account, sends the same tx "txToSend" times
//future state: registers devices of all the list of accounts.js, with different deviceid's

var fs = require('fs');
eval(fs.readFileSync('accounts.js')+'');

var μs = require('microseconds');
var Web3 = require('web3');
var web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider());
web3.setProvider(new web3.providers.HttpProvider("http://34.212.105.115:8545"));  // CONNECT TO AWSNODE!!!



var Tx = require('ethereumjs-tx');



//the following key belongs to 0x883d42e168ee2b6496ef442c986076c708ed2104, the coinbase in my MAC
var privateKey = new Buffer('bb8113182633805ca5833beaecaa201531a5e5cbd683f05539a2ac37afe5a6b8', 'hex')
var address = '0x883d42e168ee2b6496ef442c986076c708ed2104'; //  personal.listAccounts[0]
var txCount = web3.eth.getTransactionCount(address, function(err, res) {
  if (!err){
    //console.log("Tx count: "+ res); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"

    var txCount = res;//714; //909  //the transaction nonce
    var txToSend = 50;  //number devices to register

//  var registerData = '0x87e370b3000000000000000000000000883d42e168ee2b6496ef442c986076c708ed210464340000000000000000000000000000000000000000000000000000000000004465766963652038000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000015265640000000000000000000000000000000000000000000000000000000000';
    console.log('tx,send/receive,time,gasUsed');
    var startId = 1;//txCount;  //a suffix for the device id, i.e. "d1"
    for(var i=0; i<txToSend; i++){

      //Create a deviceid from txCount, convert to hex and pad to 64
      var deviceId = padding_right('d'.hexEncode() + (startId+i).toString().hexEncode(),'0',64);
      var registerData = '0x87e370b3000000000000000000000000' + '883d42e168ee2b6496ef442c986076c708ed2104' + deviceId + '4465766963650000000000000000000000000000000000000000000000000000' + '000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000015265640000000000000000000000000000000000000000000000000000000000';
      //console.log("Device id calculated: ", deviceId);

      var rawTx = {
        nonce: txCount+i,  //needs to be the current getTransactionCount() value!!!
        gasPrice: web3.utils.numberToHex(40000000000),  //originally 20 billion
      //gasLimit: web3.utils.numberToHex(8000000),
      //gasPrice: '0x4a817c800', //20 000 000 000 in decimal
        gasLimit: '0x80000',  //20 000 000 as I typically use when register.sendTransaction from geth
        to: '0x863ea7bbf877c8836244dedcd9c47311a8bfe697', //AccountManagement contract address in my mac
      //  from: '0x883d42e168ee2b6496ef442c986076c708ed2104',   //no need to specify, its deducted from the signature
        value: 0,//'0x00',
        data: registerData,
        chainId: 1985// '0x7C1' //network 1985
      }

      var before = μs.now();
      var tx = new Tx(rawTx);
      tx.sign(privateKey);
      var serializedTx = (tx.serialize()).toString('hex');
      //console.log('Length: '+ serializedTx.length);
      var time = μs.since(before); // time passed
      var parsed = μs.parse(time);

      //console.log("Output:");
      //console.log(serializedTx);
      //The latency of signing the message
      //console.log("Time: " + (parsed.milliseconds + parsed.microseconds/1000).toString());


      //console.log('Sent tx ' + i + ' ' + new Date ());

      web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'))
      .once('transactionHash', function(hash){
        console.log(hash + ', Sent, ' + new Date() + ', ,');
      })
      .once('receipt', function(receipt){ /*console.log('Receipt! BlockHash is ' + receipt["blockHash"]);*/ })
      .on('confirmation', function(confNumber, receipt){  })
      .on('error', function(error){  })
      .then(function(receipt){
      // will be fired once the receipt its mined
//      console.log('Tx: ' + receipt["transactionHash"] + ' mined on block ' + receipt["blockHash"]);
      console.log(receipt["transactionHash"] + ', received, '+ new Date() + ', ' + receipt["gasUsed"] + ', ' + receipt["from"] );
      });



    } //for


  }
  else {
    console.log(err);
  }
});




// right padding s with c to a total of n chars
function padding_right(s, c, n) {
  if (! s || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        //result += ("000"+hex).slice(-4);
        result += hex;
    }

    return result
}

function msToTime(s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}
