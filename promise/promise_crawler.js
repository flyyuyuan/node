// #npm install cheerio
var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseurl ='http://www.imooc.com/learn/';
var url = 'http://www.imooc.com/learn/348';
var videoIds=[75,259,197,134,348];//,259,197,134,348

function filterChapters(ajaxData){//将每一个课程html解析
    //console.log('filterChapters>ajaxData:'+JSON.stringify(ajaxData));
    var $ = cheerio.load(ajaxData.html);
    var chapters = $('.chapter ');//大标题
    
    var title = $('.hd.clearfix').text().trim();
    var level = $($('.static-item.l')[1]).find('span').last().text().trim();
    //console.log('title:'+title+'level:'+level);

    /*{
        title:title,
        number:number,
        videos:
            [{
                chapterTitle:'',
                videos;[
                    title:'',
                    id:''
                ]
            }]
    } */
    var courseData = {
        title:title,
        number:ajaxData.watchedNumber,
        videos:[]
    }
    
    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text().trim().replace(/\s+/g, '');
        var videos = chapter.find('.video').children('li');
        
        var chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        }
        
        videos.each(function(item){
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text().trim().replace(/\s+/g, '');
            var id = video.attr('href').split('video/')[1].trim().replace(/\s+/g, '');
            
            chapterData.videos.push({
                title:videoTitle,
                id:id
            })
        })
        courseData.videos.push(chapterData);
    })
    return courseData;
}

function printCourseInfo(coursesData)
{
    coursesData.forEach(function(courseData){
        console.log('print:'+courseData.number+' 人学过 '+courseData.title+'\n');
    })
    /* coursesData.forEach(function(courseData){
        console.log('###'+courseData.title +'['+ courseData.number+']\n');
        courseData.videos.forEach(function(item){
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle+'\n');
            
            item.videos.forEach(function(video){
                console.log('['+video.id+']'+video.title+'\n')
            })
        })
    }) */
}

function getPageAsyc(url){//获取不同url的number和对应的页面html，返回对应的对象
    return new Promise(function(resolve,reject){
        var  ajaxData = {
            watchedNumber:0,
            html:''
        }
        var numbers = new Promise(function(resolve, reject){
            var vid = url.match(/[^http://www.imooc.com/learn/]\d*/);
            var headers = {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, sdch',
                'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Cookie': 'imooc_uuid=3a6a7b23-a1cb-4e58-881f-6f01b389d10d; imooc_isnew_ct=1485182108; loginstate=1; apsid=g4NDgzNTVlZDhlZWFkZjBiMDU1MDA2MTJhNmI2NTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzczNDU0NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3aW41ZG9AcXEuY29tAAAAAAAAAAAAAAAAAAAAAAAAADgzMzg3YzIxYmRkMjNmY2FkZTgwZWFmN2JlZjVjYmIxExWGWBMVhlg%3DYT; last_login_username=win5do%40qq.com; channel=491b6f5ab9637e8f6dffbbdd8806db9b_phpkecheng; PHPSESSID=erl04j809ba73030p4nj47vmd0; imooc_isnew=2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1485426499,1485446171,1485502103,1485525699; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1485525715; cvde=588b52c05f023-9',
                'Host': 'www.imooc.com',
                'Pragma': 'no-cache',
                'Referer': url,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
            var options = {
                hostname: 'www.imooc.com',
                path: `/course/AjaxCourseMembers?ids=${vid}`,
                method: 'GET',
                headers,
            }
            
            http.get(options, function(res){
                var rawData = '';
                res.on('data', function(chunk) { 
                    console.log('ajax开始获取！');
                    rawData += chunk;
                })
                res.on('end', function(){//{"result":0,"data":[{"id":"637","numbers":"41939"}],"msg":"\u6210\u529f"}
                    console.log('ajax获取完毕！获得watchedNumber：'+parseInt(JSON.parse(rawData).data[0].numbers));
                    ajaxData.watchedNumber = parseInt(JSON.parse(rawData).data[0].numbers);
                    resolve(ajaxData);//把数据返回去
                }).on('error', function(e){
                    reject(e)
                })
            })
        })
        console.log('正在爬取'+url);
        
        http.get(url,function(res){
            var html = '';
            
            res.on('data',function(data){
                html+=data;
            })
            
            res.on('end',function(){
                 console.log('html获取完毕！');
                 //console.log('html获取完毕！'+JSON.stringify(ajaxData));
                 ajaxData.html = html;
                 resolve(numbers);//让前一个promise ajax完成，否则打印时可能ajax还未完成
                 //console.log('html获取后：'+JSON.stringify(ajaxData));
            })
        })
        .on('error',function(e){
            reject(e);
            console.log('error');
        })
    })
}
var fetchCourseArray = [];

videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsyc(baseurl+id));
})

Promise
    .all(fetchCourseArray)
    .then(function(pages){        
        var ChaptersData = [];
        pages.forEach(function(ajaxData){
            var courses = filterChapters(ajaxData);
            //console.log('json:'+JSON.stringify(courses));
            ChaptersData.push(courses);
        })
        ChaptersData.sort(function(a,b){
            return a.number > b.number;
        })
        printCourseInfo(ChaptersData);
    })


