import platform
import json
from pprint import pprint
from subprocess import call
import os, os.path


prefix = '~/' #if platform.system()=='Linux' else 'c:/'
with open('accounts.json') as data_file:
    data = json.load(data_file)

#print data

for i in range(100):
    print data[i]["privatekey"]
    file = open('key' + str(i) + '.txt','w')
    file.write(data[i]["privatekey"])
    file.close



#
# dependenciesdir = prefix + data["dependencies"]
# command = 'geth --networkid {} --datadir {}'.format(data["networkid"],prefix+data["datadir"])
#
# if data["initialize"]["run"]:
# 	command+= ' init {}'.format(dependenciesdir+data["initialize"]["filename"])
#
# else:
#     #check how many keyfiles in keystore, prepare to unlock them all
#     path = '../' + data["datadir"] + '/keystore'
#     num_files = sum(os.path.isfile(os.path.join(path, f)) for f in os.listdir(path))
#     print 'Files in keystore: ' + str(num_files)
#     accounts = []
#     for index in range(num_files):
#         accounts.append(str(index))
#     accounts_s = ",".join(accounts)  #this parameter will be used as a flag with the geth command
#     #print accounts_s
#
#     command+= ' --preload {}'.format(dependenciesdir+data["loadscript"]["filename"]) if data["loadscript"]["run"] else ''
#
#     #adjust to the number of accounts to unlock. Temporary! until i figure out how to use a wallet
#     command+= ' --unlock "{}" --password {}'.format(accounts_s, dependenciesdir+data["unlock"]["filename"]) if data["unlock"]["run"] else ''
#
#     command+= ' --rpc --rpcaddr "0.0.0.0" --rpcapi "{}" --rpccorsdomain "{}"'.format(data["rpc"]["rpcapi"],data["rpc"]["rpccorsdomain"]) if data["rpc"]["run"] else ''
#     command+= ' --mine' if data["miner"]["run"] else ''
#     command+= ' --nodiscover'
#     command+= ' --maxpeers 0'
#
#     command+= ' --verbosity 5 console 2>> {}'.format(dependenciesdir+'logfile.txt') if data["logfile"]["run"] else ' console'
#     #command+= ' console'
#
# print command
# call([command],shell=True),
