var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content':'scott is  vevy good',
    'cid':348
})

var options = {
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    header:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=ad3ff7b6-1ead-405c-a469-db76e6bcdecc; imooc_isnew_ct=1485851876; loginstate=1; apsid=M1ZDQyOGY2YTU1ODIzYWRkMmE0Y2QyMTZlMjBhODIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTM4NDMxNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyNDAwOTA4MzlAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGJiNzEwZTQyNmJjZjY2MGI2ZDQ3NWNmZDdmMTQ5NWEzFU2QWBVNkFg%3DMG; last_login_username=240090839%40qq.com; PHPSESSID=c9jma03tvbtuudrhj244ocfuo1; imooc_isnew=2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1486001566,1486021888,1486025732,1486091933; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1486113172; cvde=5893f69d1bb4d-164',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/comment/348',
        'User-Agent':'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    } 
}

var req = http.request(options,function(res){
    console.log('Status:'+res.statusCode);
    console.log('headers:'+JSON.stringify(res.headers));
    
    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
        console.log(chunk);
    })
    
    res.on('end',function(){
        console.log('评论完毕!');
    })
})

    req.on('error',function(e){
        console.log('Error:'+e.message)
    })
    req.write(postData);
    req.end();