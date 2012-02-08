var Iconv  = require('iconv').Iconv

var reghtml = new  RegExp('<meta.*charset=([^"]+)');
var regxml = new RegExp('<\?xml.*encoding="([^"]+)');
var regheader = new RegExp('.*charset=([^]+)');


exports.getXMLCharset = function(res, str){
    if(str){
        var charset =  regheader.exec(res.headers['content-type']);
        if(charset)
            return charset[1];
        else{
            charset = regxml.exec(str);
            if(charset)
                return charset[1];
            else
                return 'utf-8';
        }
    }
    return 'utf-8';
}

exports.getHTMLCharset = function(res, str){
        if(str){
        var charset =  regheader.exec(res.headers['content-type']);
        if(charset)
            return charset[1];
        else{

            charset = reghtml.exec(str);
            if(charset)
                return charset[1];
            else
                return 'utf-8';

        }
    }
    return 'utf-8';
}

exports.getConvert = function(str){
    var iconv = new Iconv('gb2312', 'UTF-8');
    var utf8_buffer = iconv.convert(str);
    console.log(utf8_buffer.toString());

}
//    var str = '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>';
//    var str1 = '<?xml version="1.0" encoding="gb2312"?>';
//    var str2 = 'text\html; charset=gbk';
//

//var http = require('http');
//var options = { host: 'www.baidu.com', port: 80, path: '/s?wd=nodejs' };
//var Iconv = require('iconv').Iconv;
//
//http.get(options, function(res) {
//    console.log("Got response: " + res.statusCode, res.headers);
//    var buffers = [], size = 0;
//    res.setEncoding('binary');
//
//    res.on('data', function(buffer) {
//        buffers.push(buffer);
//        size += buffer.length;
//    });
//    res.on('end', function() {
//        var buffer = new Buffer(size), pos = 0;
//        for(var i = 0, len = buffers.length; i < len; i++) {
//            buffers[i].copy(buffer, pos);
//            pos += buffers[i].length;
//        }
//        // 'content-type': 'text/html;charset=gbk',
//        var gb2312_to_utf8_iconv = new Iconv('GBK', 'UTF-8');
//        var utf8_buffer = gb2312_to_utf8_iconv.convert(buffer);
//        console.log(utf8_buffer.toString());
//    });
//}).on('error', function(e) {
//    console.log("Got error: " + e.message);
//});