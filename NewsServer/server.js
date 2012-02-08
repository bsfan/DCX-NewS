//news server. nodejs
var express = require('express')
  , ejs = require('ejs')
  , news = require('./controllers/news')
  , url = require('url');

var config = require('../share/config');
var Iconv  = require('iconv').Iconv;
var db = config.db;

var app = express.createServer();
app.use(express.static(__dirname + '/public', {maxAge: 3600000 * 24 * 30}));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
    secret: config.session_secret
}));
/**
 * Fixed CSRF
 *  add '<input type="hidden" name="csrf" value="<%- it.csrf %>" />' to form
 */
app.helpers({
    config: config
});

/**
 * Views settings
 */
app.set("view engine", "html");
app.set("views", __dirname + '/views');
app.register("html", ejs);

/**
 * Routing
 */
app.get('/', news.index);
app.get('/news', news.ctg);
app.get('/news/view', news.view);
app.get('/news/previous', news.previous);
app.get('/news/next', news.next);

app.listen(config.port);
console.log('Server start http://localhost:' + config.port);