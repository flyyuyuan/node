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

//当前函数拥有者，也就是上下文，只能在函数内部使用
function Pet(words){
    this.cc = words;
    this.speak = function(){
        console.log(this.cc);
        console.log(this);
    }
}

var cat  =new Pet('miao');
cat.speak();