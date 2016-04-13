var express = require('express');
var router = express.Router();
var Photos = require('../models/photos');

router.get('/', function(req, res, next) {

  Photos.getPhotos( {'requestType': 'flickr.people.getPublicPhotos', 'per_page': '12', 'page': '1'}, function(response) {
    var d = JSON.parse(response);
  
    res.render('photos', {
      pics: d.photos.photo, 
      title: 'robyn meshulam', 
      page_title: 'photos'
    });
  });
});

module.exports = router;
