function Pet(words){
    this.words = words;
    this.speak = function(){
        console.log(this.words);
    }
}

function Dog(words){
    Pet.call(this,words);//继承Pet
    //Pet.apply(this,words);
}
function Cat(words){
    Pet.call(this,words);//继承Pet
}
var dog = new Dog('wang');
var cat = new Cat('miao');
dog.speak();
cat.speak();