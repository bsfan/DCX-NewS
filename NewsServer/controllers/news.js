
var config = require('../../share/config')
  , db = config.db;
var offset = 30;
  
//----------New Server--------

exports.index = function(req, res, next){
    db.query('select * from all_news order by id desc limit 30', function(err, rows) {
        if(err || (rows.length==0))
            return next(err);
        res.render('index', {news: rows, ctg:0, pre_id:rows[rows.length -1].id, nxt_id:rows[0].id});
    });
};

exports.ctg = function(req, res, next) {
    var category = req.query.category;
    db.query('select * from all_news where ctg=? order by id desc limit 30',[category], function(err, rows) {
        if(err || (rows.length==0))
            return next(err);
        res.render('index', {news: rows, ctg: category, pre_id:rows[rows.length -1].id, nxt_id:rows[0].id});
    });
};

exports.next = function(req, res, next) {
    var category = req.query.category;
    var lastId = req.query.id;

    if(category==0)
    {
        db.query('select * from all_news where id<? order by id desc limit 30',[lastId], function(err, rows) {
            if(err) return next(err);
            if(rows.length > 0)
                res.render('index', {news: rows, ctg: category, nxt_id:rows[rows.length -1].id, pre_id:rows[0].id});
            else
                res.send('no more next!'+category);
        });
    }else
    {
    db.query('select * from all_news where ctg=? and id<? order by id desc limit 30',[category, lastId], function(err, rows) {
        if(err) return next(err);
        if(rows.length > 0)
            res.render('index', {news: rows, ctg: category, nxt_id:rows[rows.length -1].id, pre_id:rows[0].id});
        else
            console.send('no more next!'+category);
    });
    }
};

exports.previous = function(req, res, next) {
    var category = req.query.category;
    var firstId = req.query.id;

    if(category==0)
    {
        db.query('select * from all_news where id>? order by id desc limit 30',[firstId], function(err, rows) {
            if(err) return next(err);
            if(rows.length > 0)
                res.render('index', {news: rows, ctg: category, nxt_id:rows[rows.length -1].id, pre_id:rows[0].id});
            else
                res.send('no more next!'+category);
        });
    }else
    {
    db.query('select * from all_news where ctg=? and id>? order by id desc limit 30',[category, firstId+30], function(err, rows) {
        if(err) return next(err);
        if(rows.length > 0)
            res.render('index', {news: rows, ctg: category, nxt_id:rows[rows.length -1].id, pre_id:rows[0].id});
        else{
           console.send('no more previous!'+category);
        }
    });
    }
};

exports.view = function(req, res, next) {
    var id = req.query.id;
    var category = req.query.ctg;
    db.query('select * from all_news where id=?', [id], function(err, rows) {
        if(err) return next(err);
        if(rows && rows.length > 0) {
            
            //res.send("ok , it's a cheat");
            res.render("body",{body:rows[0].content});
            //res.render('/Users/ntop/Documents/nodespace/DCXnews/NewsServer/unitest.html');
        } else {
            next();
        }
    });
};

function next(){
}

function previous(){
}

//----------News API--------
//return json for certain ctg,sid
exports.json = function(req, res, next){
    var cid;
    var sid;
    var remote_id;
    
    if(!cid && !cid){
        db.query('select * from all_news where cid=?, sid=? and id>? order by id desc limit 20', [cid,sid,remote_id], function(err, rows){
            if(err || (rows.length<=0)) return next(err);
            //ready
        });
    }else if(cid)
    {
    
    }
    
};

//return article for certain article id.
exports.article = function(req, res, next){
    var id;
    if(!id) return;
    db.query('select * from all_news where id=?',[id], function(err, rows){
        if(err || (rows.length <= 0))
            next(err);
        else
            res.render("body",{body:rows[0].content});
    });
};

//return hotest news

exports.top = function(req, res, next){

};

//generate json
function jsonGenerater(rows)
{
    var json = {};
    if(rows.length <= 0)
    {
        return "{}";
    }else
    {
        for(var i=0; i< rows.length;i++)
        {
            
        }
    }
}
