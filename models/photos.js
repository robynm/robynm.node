var config = require('../config/config');
var https = require('https');

function Photos(reqType, perPage, pages) {
  this.urlBase = config.urlBase;
  this.apiKey = config.apiKey;
  this.userId = config.userId;
  this.reqType = reqType;
  this.perPage = perPage;
  this.pages = pages;
}

Photos.prototype.getPhotos = function(callback) {
  var responseText = '';
  var options = {
    hostname: this.urlBase,
    path: '/services/rest/?method=' + this.reqType + '&api_key=' + this.apiKey + '&user_id=' + this.userId + '&per_page=' + this.perPage + '&page=' + this.pages + '&format=json&nojsoncallback=1',
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    res.on('data', function(d) {
      responseText += d;
      callback(responseText);
    });
  });

  req.end();

  req.on('error', function(e) {
    // do something
  });
}

module.exports = Photos;