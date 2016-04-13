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

  }
};