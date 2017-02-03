var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();
life.setMaxListeners(11);
//add EventListener

function click_listerer1(who)
{ 
    console.log('btn ' +who+' click_listerer1');
}

life.on('click',click_listerer1);
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer2');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer3');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer4');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer5');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer6');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer7');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer8');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer9');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer10');
})
life.on('click',function(who){
    console.log('btn ' +who+' click_listerer11');
})

life.on('update',function(who){
    console.log('btn ' +who+' update_listerer1');
})
life.on('update',function(who){
    console.log('btn ' +who+' update_listerer2');
})
    
/* life.on('delete',function(who){
    console.log('btn ' +who+' delete_listerer1');
}) */

life.removeListener('click',click_listerer1);

var hasClickListener = life.emit('click','yfy')
var hasUpdateListener = life.emit('update','yfy')
var hasDeleteListener = life.emit('delete','yfy')

console.log(hasClickListener);
console.log(hasUpdateListener);
console.log(hasDeleteListener);
console.log('click 事件监听数量：'+ life.listeners('click').length);
console.log('click 事件监听数量：'+ EventEmitter.listenerCount(life,'click'));

life.removeAllListeners('click');
console.log('移除click后，click 事件监听数量：'+ EventEmitter.listenerCount(life,'click'));
console.log('update 事件监听数量：'+ EventEmitter.listenerCount(life,'update'));
