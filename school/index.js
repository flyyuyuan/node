var klass = require('./klass');

function add(klasses)
{
    klasses.forEach(function(item,index){
        var _klass = item;
        var teachername = _klass.teachername;
        var students = _klass.students;
        
        klass.add(teachername,students);
    })
}
exports.add = add;