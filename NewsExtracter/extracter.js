//----------------Worker to extract article-----------------
var db = require('../share/config').db;
var ContentExtraction = require('./tools/ce.js').ContentExtraction;
var ce = new ContentExtraction();
var log = require('../share/log');

var work_start_id = 118;

doExtract(work_start_id);

function doExtract(start_id){

    db.query('select * from raw_url where id>? limit 100',[start_id], function(err, rows){
        if(err) {
            console.log('error return from doExtract db query');
            return;
        }
        for(var i=0; i< rows.length; i++)
        {
              var raw = rows[i];
              log.log('url:'+raw.link);
              extractArticle(raw, function(raw, content){
                        insertArticle(raw,content);
                    }
              );
         }
    });
}

function extractArticle(raw, callback){
        try {
                ce.extractByUrl(raw.link, function(error, item_content, item_url) {
                    if(error) {
                        console.log('error from extractArticle !!:'+error.message);
                        return;
                    }
              
                    callback(raw,item_content);
                });
            }catch(exception) {
               console.log('error from extractArticle !!'+exception);
            }
}

function insertArticle(raw, content){
    db.query('insert into all_news set ctg=?, sid=?, title=?, link=?, content=?, post_date=?',
                    [raw.ctg,raw.sid,raw.title,raw.url,content,raw.date],function(err, info){
                        if(err)
                            console.log("error from insertArticle : "+err.message);
                    }
            );
}
