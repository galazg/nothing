import requests
import time
import json


print 'hola from requests'

#curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' blockchain2-1931353469.us-west-2.elb.amazonaws.com:8545

host = 'http://52.40.39.135:8545' #the new AWS instace
#host = 'http://blockchain2-1931353469.us-west-2.elb.amazonaws.com:8545'  #the loadbalancer
#host =  'http://localhost:8545'
#payload = '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' #payload for getting the accounts

contract_address = '0x878a4e48fc9c4fba3cff72404c312b898264d281'
validate_hash_true  = '0x10c9afa600000000000000000000000036ad75d80fdbf66664fdcf8873219667cc52322364310000000000000000000000000000000000000000000000000000000000005030310000000000000000000000000000000000000000000000000000000000'
validate_hash_false = '0x10c9afa6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
#.format() doesnt work :(
#data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"{}", "data":"{}"},"latest"],"id":1}'.format(contract_address,validate_hash)
data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + contract_address + '", "data": "'+ validate_hash_false +'"}, "latest"],"id":1}'

print data

roundtrips = []
f = open('out2.txt', 'w')

for x in range(10):
    start = time.time()
    r = requests.post(host, data = data)
    roundtrip = time.time() - start
    print r.text
    print roundtrip
    #rountrips.append(roundtrip)
    f.write(str(roundtrip))
    f.write('\n')

f.close()


# start = time.time()
# r = requests.get('http://192.168.2.15/sqli-labs/Less-9', params=payload)
# roundtrip = time.time() - start
# print roundtrip
