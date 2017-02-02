var pet = {
    words:'...',
    speak:function(say){
        console.log(say+' '+this.words);
        console.log(this===dog);
    }
}

pet.speak('Speak');

var dog = {
    words:'wang'
}

pet.speak.call(dog,'speak')