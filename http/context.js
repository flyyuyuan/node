//step1
// var pet = {
// word:'hello,I am pet obj',
// speak:function()
    // {
        // console.log(this.word);
        // console.log(this===pet);
    // }
// }
// pet.speak();

//step2
// function pet(words)
// {
    // this.words = words;
    
    // console.log(this.words);
    // console.log(this===global);
// }

// pet('...');

//��ǰ����ӵ���ߣ�Ҳ���������ģ�ֻ���ں����ڲ�ʹ��
function Pet(words){
    this.cc = words;
    this.speak = function(){
        console.log(this.cc);
        console.log(this);
    }
}

var cat  =new Pet('miao');
cat.speak();