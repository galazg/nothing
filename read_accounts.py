f = open ( 'accounts.txt' , 'r')
#l = []
accounts = [ line.strip() for line in f]
#print l
f = open ( 'contracts.txt' , 'r')
contracts = [ line.strip() for line in f]


#
# with open("accounts.txt", "r") as ins:
#     accounts = []
#     for line in ins:
#         accounts.append(line)
#
# with open("contracts.txt", "r") as ins:
#     contracts = []
#     for line in ins:
#         contracts.append(line)
#


for i in accounts:
    print i
for i in contracts:
    print i

print '\n'
print accounts[0]
print accounts[1]
print accounts[2]
