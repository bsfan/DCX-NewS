var debug = true;
var debug_level0 = debug;
var debug_level1 = true;
var debug_level2 = true;
var debug_level3 = true;
exports.log = function(str){
    if(debug)
        console.log(str);
}

exports.log0 = function(str){
    if(debug_level0)
        console.log(str);
}

exports.log1 = function(str){
    if(debug_level1)
        console.log(str);
}

exports.log2 = function(str){
    if(debug_level2)
        console.log(str);
}

exports.log3 = function(str){
    if(debug_level3)
        console.log(str);
}