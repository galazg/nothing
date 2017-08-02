//An attempt to create a BOT that will sendTransaction using nodejs and web3
//status: this does not work yet. async calls! works differently than the browser version 1 Aug 17


var sync = require('synchronize')
var fs   = require('fs')

var μs = require('microseconds');

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());

var accmgmt_address = "0x863ea7bbf877c8836244dedcd9c47311a8bfe697"; //updated 19 July 2017
var accmgmt_abi = [{"constant":false,"inputs":[{"name":"plname_","type":"bytes32"},{"name":"code_","type":"bytes32"},{"name":"desc_","type":"bytes32"},{"name":"price_","type":"uint256"}],"name":"set_pricelist_right","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"},{"name":"rights_","type":"bytes32[]"}],"name":"set_device_rights","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"name_","type":"bytes32"}],"name":"get_pricelist","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"},{"name":"capability_code_","type":"bytes32"}],"name":"validate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"plname_","type":"bytes32"},{"name":"code_","type":"bytes32"}],"name":"get_right_price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr_","type":"address"},{"name":"name_","type":"bytes32"},{"name":"balance_","type":"uint256"},{"name":"pricelist_","type":"bytes32"}],"name":"set_owner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"}],"name":"rem_device","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner_","type":"address"}],"name":"get_device_count","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"plname_","type":"bytes32"},{"name":"code_","type":"bytes32"},{"name":"desc_","type":"bytes32"},{"name":"price_","type":"uint256"}],"name":"new_pricelist_right","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"addr_","type":"address"}],"name":"get_owner","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner_","type":"address"}],"name":"get_device_list","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"},{"name":"status_","type":"bytes32"}],"name":"set_pricelist_status","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"},{"name":"device_name_","type":"bytes32"},{"name":"rights_","type":"bytes32[]"}],"name":"register","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"}],"name":"get_device_rights","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr_","type":"address"},{"name":"name_","type":"bytes32"},{"name":"balance_","type":"uint256"},{"name":"pricelist_","type":"bytes32"}],"name":"new_owner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"new_pricelist","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner_","type":"address"}],"name":"get_owner_pricelist","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_owners_list","outputs":[{"name":"","type":"address[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_owner_count","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"},{"name":"device_name_","type":"bytes32"}],"name":"new_device","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pricelists_count","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get_pricelists_arr","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"device_id_","type":"bytes32"},{"name":"right_code_","type":"bytes32"}],"name":"validate_simplified","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"},{"name":"device_id_","type":"bytes32"},{"name":"right_code_","type":"bytes32"}],"name":"rem_device_rights","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner_","type":"address"},{"indexed":false,"name":"balance_","type":"uint256"},{"indexed":false,"name":"device_id_","type":"bytes32"}],"name":"ModifiedRightsEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner_","type":"address"},{"indexed":false,"name":"device_id_","type":"bytes32"},{"indexed":false,"name":"message","type":"bytes32"}],"name":"RemDeviceEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner_","type":"address"},{"indexed":false,"name":"balance_","type":"uint256"},{"indexed":false,"name":"deviceid_","type":"bytes32"},{"indexed":false,"name":"device_name_","type":"bytes32"}],"name":"NewDeviceEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"address_","type":"address"},{"indexed":false,"name":"name_","type":"bytes32"},{"indexed":false,"name":"balance_","type":"uint256"},{"indexed":false,"name":"pricelist_","type":"bytes32"}],"name":"OwnerUpdatedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"address_","type":"address"},{"indexed":false,"name":"name_","type":"bytes32"},{"indexed":false,"name":"balance_","type":"uint256"},{"indexed":false,"name":"pricelist_","type":"bytes32"}],"name":"NewOwnerEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"bytes32"}],"name":"ErrorEvent","type":"event"}];
//var contract_accmgmt = web3.eth.Contract(accmgmt_abi);
//var accmgmt = contract_accmgmt.at(accmgmt_address);
var fer = '0x883d42e168ee2b6496ef442c986076c708ed2104';

var balance = web3.eth.getBalance(fer,function(err,result){
  if(!err){
    console.log(result);



  }
})

//
// var Tx = require('ethereumjs-tx');
// var privateKey = new Buffer('bb8113182633805ca5833beaecaa201531a5e5cbd683f05539a2ac37afe5a6b8', 'hex')
//
// // var txCount = web3.eth.getTransactionCount('0x883d42e168ee2b6496ef442c986076c708ed2104', function(err, res) {
// //   if (!err)
// //     console.log("Tx count: "+ res); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
// //   else {
// //     console.log(err);
// //   }
// // });
// var txCount = 633;
// var txToSend = 64;  //number of transactions to send
// var registerData = '0x87e370b3000000000000000000000000883d42e168ee2b6496ef442c986076c708ed210464380000000000000000000000000000000000000000000000000000000000004465766963652038000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000015265640000000000000000000000000000000000000000000000000000000000';
//
//
// for(var i=0; i<txToSend; i++){
//
// var rawTx = {
//   nonce: txCount+i,  //needs to be the current getTransactionCount() value!!!
//   gasPrice: web3.utils.numberToHex(1600000000000),  //originally 20 billion
//   gasLimit: web3.utils.numberToHex(20000000),
// //gasPrice: '0x4a817c800', //20 000 000 000 in decimal
// //gasLimit: '0x1312d00',  //20 000 000 as I typically use when register.sendTransaction from geth
//   to: '0x863ea7bbf877c8836244dedcd9c47311a8bfe697', //AccountManagement contract address in my mac
// //  from: '0x883d42e168ee2b6496ef442c986076c708ed2104',   //no need to specify, its deducted from the signature
//   value: 0,//'0x00',
//   data: registerData,
//   chainId: 1985// '0x7C1' //network 1985
// }
//
// //am.register.getData(fer,"d8","Device 8",["Red"])
//
// var before = μs.now();
//
// var tx = new Tx(rawTx);
// tx.sign(privateKey);
// var serializedTx = (tx.serialize()).toString('hex');
//
// console.log('Length: '+ serializedTx.length);
//
// var time = μs.since(before); // time passed
// var parsed = μs.parse(time);
//
// console.log("Output:");
// console.log(serializedTx);
// console.log("Time: " + (parsed.milliseconds + parsed.microseconds/1000).toString());
//
//
//
// web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
//   if (!err)
//     console.log("Hash obtained: "+ hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
//   else {
//     console.log(err);
//   }
// });
//
//
// } //for
