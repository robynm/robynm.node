var config = require('../config/config');
var https = require('https');

module.exports = {
  
  getPhotos: function(opts, callback) {
    var responseText = '';
    var reqPath = '/services/rest/?';
    
    var params = {
      'method': opts.requestType,
      'api_key': config.apiKey,
      'user_id': config.userId,
      'per_page': opts.per_page,
      'page': opts.page,
      'format': 'json',
      'nojsoncallback': '1'
    };

    for ( key in params) {
      reqPath += key + '=' + params[key] + '&';
    }

    reqPath = reqPath.slice(0, -1);

    var options = {
      hostname: config.urlBase,
      path: reqPath,
      method: 'GET'
    };
  
    var req = https.request(options, function(response) {
      response.on('data', function(d) {
        responseText += d;
      });

      response.on('end', function() {
        callback(responseText);
      });
    });

    req.end();

    req.on('error', function(e) {
      // do something
    });

  },

  getSource: function(photoList) {
    var photos, photoSources = [];
    var photoList = JSON.parse(photoList);

    if ( photoList.stat === "ok" && Array.isArray(photoList.photos.photo) ) {
      photos = photoList.photos.photo;

      for ( var i = 0; i < photos.length; i++ ) {
        photoSources[i] = {
          id: photos[i].id,
          src: "https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + "_q.jpg",
          alt: photos[i].title
        }
      }
    }
    return photoSources;
  }
};