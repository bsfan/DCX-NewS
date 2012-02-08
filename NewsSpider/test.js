var db = require('../share/config.js').db;
var log = require('../share/log.js');
//test spider TABLE raw_url
now();
//isExit('abc');
//-----function------
function isExit(title, callback){
    db.query('select * from raw_url where title=? limit 1',
                [title],
                function(err, raws){
                    if(err){
                        log.log('err from isExit :'+err.message);
                        return;
                    }
                    
                    if(raws.length > 0)
                    {
                        log.log('The item exits in the table !!')
                        return;
                    }else{
                        log.log('The item dont exit in the table');
                    }
                    db.end();
                    
                }
            );
}

//d

function now()
{
    var date = new Date();
    log.log(date);
}

