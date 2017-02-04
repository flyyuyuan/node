var https = require('https');
var  fs =require('fs');

var hostname = '127.0.0.1';
var port = 8091;

var options = {
    key:fs.readFileSync('ssh_key.pem');
    cert:fs.readFileSync('ssh_cert.pem');
}

var server = https.createServer(options,function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Imooc!!\n');
});

server.listen(port, hostname, function(){
  console.log(`Server running at https://${hostname}:${port}/`);
});

/* https.creatServer(options,function(req,res){
    res.writeHead(200);
    res.end('hello Imooc');
}).listen(8090); */