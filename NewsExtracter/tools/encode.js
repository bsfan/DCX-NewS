var http = require('http');
var constants = require('./tools/constants.js');
var fs = require('fs');

//http://news.baidu.com/n?cmd=1&class=enternews&tn=rss
var options = { host: 'news.baidu.com', port: 80, path: '/n?cmd=1&class=enternews&tn=rss' };
var Iconv = require('iconv').Iconv;
//http://news.baidu.com/n?cmd=1&class=civilnews&tn=rss
http.get(options, function(res) {
        //response.setEncoding('binary');

    console.log("Got response: " + res.statusCode, res.headers);
    //var length = res.headers['content-length'];
    //var myBuffer = new Buffer(length);
    //res.setEncoding('binary');
    var buffers = [], size = 0;
    res.on('data', function(chunk) {
        buffers.push(chunk);
        size += chunk.length;
    });
    res.on('end', function() {
        var buffer = new Buffer(size);
        for(var i = 0, position =0; i< buffers.length ; i++){
            //position+=buffer.write(buffers[i],position);
            buffers[i].copy(buffer,position);
            position+=buffers[i].length;
        }
        var charset = constants.getXMLCharset(res, buffer.toString());
        //console.log(buffer.toString());
        //console.log('content length:'+buffer.length);
        //console.log('charset is '+charset);

        var gb2312_to_utf8_iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');
        var utf8_buffer = gb2312_to_utf8_iconv.convert(buffer);

        fs.writeFile('test.html', utf8_buffer.toString(), function (err) {
             if (err) {
                 console.log('error from saveToFile write file'+err.message);
             }
        });
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});