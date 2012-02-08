// built in libraries
var fs = require('fs')
    , uri = require('url')
    , urlopen = require('./urlopen')
    , log = require('../../share/log');

// external libraries
var readability = require('readability');

var ContentExtraction = function(settings) {
  this.settings = settings;
  this.url_count = 0;
}


ContentExtraction.prototype.extract = function(url, content, callback) {

        readability.parse(content, url, function(info) {
        callback(null, info.content, url, info.title);

      }); // end readability content extraction
}

ContentExtraction.prototype.extractByUrl = function(url, callback) {
  var self = this,
      urlopen_settings = {force_cache: false, keep_alive: true};

  urlopen.open(url, urlopen_settings, function(error, content, response) {
    if(error || !content) {
      callback(error);
      return;
    }
    log.log('get & parce html succeed !!');
    self.extract(url, content, callback);
  });
}

exports.ContentExtraction = ContentExtraction;

