function learn(sth){
    console.log(sth);
}

function we(callback,sth){
    sth+=' is cool';
    callback(sth);
}
//ֱ�ӵ���
we(learn,'io.js');
//��������
we(function(sth){
    console.log(sth);
},'node.js');