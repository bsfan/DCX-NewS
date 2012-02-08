/**
 * Module provides methods for accessing the json based configuration
 * settings.
 * 
 * @fileOverview
 */

// built in libraries
var fs = require('fs'),
    util = require('util');

// external libraries
var func = require('./func.js');

var settings = null;

// load the configuration settings
function load() {
  if(settings == null) {
    console.log('[load settings.json file]');
    settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
    if(func.file_exists('user_settings.json')) {
      console.log('[found and load the user_settings.json file]');
      var user_settings = JSON.parse(
        fs.readFileSync('user_settings.json', 'utf8')
      );

      settings = func.object_merge(settings, user_settings);
    }
    
  }
}
load();

function get(key) {
  return settings[key];
}
exports.get = get;
