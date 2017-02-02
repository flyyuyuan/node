function foo(){}

foo.prototype.z=3;
foo.prototype.speak = function(){
    console.log('speak ...');
}

var obj =new foo();
obj.x=1;
obj.y=2;

console.log('x:"'+obj.x);
console.log('y:"'+obj.y);
console.log('z:"'+obj.z);
obj.speak();