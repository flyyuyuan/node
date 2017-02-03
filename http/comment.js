var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content':'scott 老师很棒，继续学习！',
    'mid':8837
})

var options = {
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate,sdch',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=c5cb371f-dfc6-4ef8-858a-bc93db284770; imooc_isnew_ct=1486007874; PHPSESSID=h25b1ko23ubnci2hakr1uh5704; loginstate=1; apsid=M1ZDQyOGY2YTU1ODIzYWRkMmE0Y2QyMTZlMjBhODIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTM4NDMxNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyNDAwOTA4MzlAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGFkNzUxNzNhZTgyZWMwMzViZjI4YTEwMzU2OGU3MzAw0mGUWNJhlFg%3DMG; last_login_username=240090839%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1486007872,1486119343; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1486119977; imooc_isnew=2; cvde=589461b04f8b5-24',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/video/8837',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36',
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