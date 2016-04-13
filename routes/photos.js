var express = require('express');
var router = express.Router();
var Photos = require('../models/photos');

router.get('/', function(req, res, next) {
  // var p = new Photos('flickr.people.getPublicPhotos', 12, 1);
  // p.getPhotos(function(response) {
    // var d = JSON.parse(response);
    res.render('photos', {
      // pics: d.photos.photo, 
      title: 'robyn meshulam', 
      page_title: 'photos'
    });
  // });
});

module.exports = router;
