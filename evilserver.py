#this code works across the local network
#responds to web UI in json format

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests
from os import curdir, sep
import urlparse, json

host = 'http://localhost:8001'
tcp_port = 8085


print 'Running server on port ' + str(tcp_port)

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        mimetype='text/html'
        if self.path =='/':
        	#Open the static file requested and send it
            self.path = '/index.html'
            mimetype='text/html'
        if self.path =='/bootstrap/css/bootstrap.min.css':
            mimetype='text/css'
        if self.path =='/bootstrap/js/bootstrap.min.js':
            mimetype='application/javascript'
        if self.path =='/block_interface.js':
            mimetype='application/javascript'

        #f = open(curdir + sep + self.path)
        #print curdir + sep + self.path
        self.send_response(200)
        self.send_header('Content-type',mimetype)
        self.end_headers()
        #self.wfile.write("/../../../../../home/level1/ke")
        self.wfile.write("");
        self.wfile.write("<script>alert('hola');</script>");
        #f.close()


        return

httpd = SocketServer.TCPServer(("", tcp_port), MyHandler)
httpd.serve_forever()
