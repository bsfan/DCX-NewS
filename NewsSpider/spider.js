//----------------Timer to get raw article url-----------------
// built in libraries
var fs = require('fs'),
    uri = require('url'),
    xml2js = require('xml2js'),
    http = require("http"),
    url = require('url'),
    timer = require('timers'),
    Iconv  = require('iconv').Iconv;

var db = require('../share/config.js').db;
var encoder = require('./tools/encoder.js');
var log = require('../share/log.js');

var req_data={};
var sleepTime = 60*60*1000;
var limit = 50;

/*
timer.setInterval(function(){
    console.log('start timer event');
    doCollecting();
}, sleepTime);

timer.setTimeout(function(){
   doCollecting();
},1000);
*/

doCollecting();

//read feed url
 function doCollecting(){
    db.query('set names utf8');//fix 中文乱码
    db.query('select * from site limit ?',[limit], function(err, rows){
        if(err) {
            console.log('error return from doCollecting db query');
            return;
        }
        
        for(var i=0; i< rows.length; i++)
        {
              var op = {ctg:rows[i].ctg,
                        sid:rows[i].sid,
                        url:rows[i].url
                        };
              getFeedXML(op);
         }
    });
}

//read feed content
function getFeedXML(op){
    var result = url.parse(op.url);
    var options = {
        host:result.host,
        path:result.href.substr(result.host.length+7),
        method:'GET'
    }

    http.get(options, function(res) {
    if(res.statusCode == 200){
      var buffers = [],size = 0;
      res.on('data', function (chunk) {
            buffers.push(chunk);
            size+=chunk.length;
      });

      res.on('end', function(){
        var buffer = new Buffer(size), pos = 0;
        for(var i = 0, len = buffers.length; i < len; i++) {
            buffers[i].copy(buffer, pos);
            pos += buffers[i].length;

        }
        var charset = encoder.getXMLCharset(res, buffer.toString('utf-8'));

        console.log('charset is '+charset);
          
        if(charset == 'utf-8'){
            saveRawUrl(buffer.toString(), op);
            return;
        }else{
            var iconv = new Iconv(charset, 'UTF-8//TRANSLIT//IGNORE');
            var utf8_buffer = iconv.convert(buffer);
            saveRawUrl(utf8_buffer.toString(), op);
        }

      });
    }

    }).on('error', function(e) {
       console.log("Got error: " + e.message);//retry
    });
}

function saveRawUrl(xml_str, op){
    parser = new xml2js.Parser();
    parser.addListener('end', function(result) {
        channel= result.channel;
        if(!channel || !channel.item || (channel.item.length == 0))
            return;
        items = channel.item;
        
        for(var i = 0; i < items.length; ++i) { 
            (function() {
            var index = i;
            item = items[index];
          
            try {
                    isExit(item,function(exits,item){
                    if(exits) {
                        log.log('the item already exit');
                        return;
                    }
                    insert(item, op);
                    
                    log.log('insert item to db !!');

                });
            
            } catch(exception) {
                log.log('exception in operating db :'+exception);
            }

         })();
         
        } // end each item
    });
    parser.parseString(xml_str);
}

function isExit(item, callback){
    db.query('select * from raw_url where title like ? limit 1',
                [item.title],
                function(err, raws){
                    if(err){
                        log.log('err from isExit :'+err.message);
                        db.end();
                        return;
                    }
                    if(raws.length > 0){
                        callback(true);
                    } else{
                        callback(false, item);
                    }
                }
            );
}
function now()
{
    return (new Date())
}
//now is not a function in nodejs, I must implement it.
function insert(item, op){
    db.query('insert into raw_url set ctg=?, sid=?, title=?, link=?, post_date=?',
                    [op.ctg, op.sid, item.title, item.link, item.pubDate?item.pubDate:now()],function(err, result){
                        if(err){
                            console.log("error from insert raw url : "+err.message);
                            return;
                        }
                        //else ?
                    }
            );
}