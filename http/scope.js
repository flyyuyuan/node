var globalVariable = 'this is  global variable';

function golbalFunc()
{
    var localVariable = 'this is local variable';
    
    console.log('Visit global / local variable');  
    console.log(globalVariable);
    console.log(localVariable);
    
    globalVariable = 'this is change global variable';
    console.log(globalVariable);
    
    function localfunc()
    {
        var innerLocalVariable = 'this is inner local variable';
        console.log('Visit global / local / inner variable');  
        console.log(globalVariable);
        console.log(localVariable);
        console.log(innerLocalVariable);
    }
    localfunc();
}

golbalFunc();