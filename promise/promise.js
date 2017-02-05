p1()
    .then(()=>{
        return p2;
    })
    .then(()=>{
        return p3;//promise链中then方法的入参是 一个返回promise对象的函数,p3是promise对象，用个函数return返回即可
      })
    .then(p4)
    .then(p5)
    .then(function(data) {
        console.log('data: ' + data);
    })
    .catch(function(error) {
        console.log('error: ' + error);
    });
      
function p1() {
  return new Promise(function(resolve, reject) {
    console.log('p1-- resolved');
    resolve('p1--');
  });
}

var p2 = new Promise(function(resolve, reject) {
    console.log('p2-- resolved');
    resolve('p2--');
  });
/* function p2() {
  return new Promise(function(resolve, reject) {
    console.log('p2-- resolved');
    resolve('p2--');
  });
} */

var p3 = new Promise(function(resolve, reject) {
  //do something here
  //when do something done
  console.log('p3-- resolved');
  resolve('p3--');
});

function p4() {
  return new Promise(function(resolve, reject) {
    console.log('p4-- reject');
    reject('p4--');
  });
}
function p5() {
  return new Promise(function(resolve, reject) {
    console.log('p5-- reject');
    resolve('p5');
  });
}




