function learn(sth){
    console.log(sth);
}

function we(callback,sth){
    sth+=' is cool';
    callback(sth);
}
//直接调用
we(learn,'io.js');
//匿名函数
we(function(sth){
    console.log(sth);
},'node.js');