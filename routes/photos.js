var express = require('express');
var router = express.Router();
var Photos = require('../models/photos');

router.get('/', function(req, res, next) {
  var p = new Photos('flickr.people.getPublicPhotos', 6, 1);
  var data = p.getPhotos(function(response) {
    var d = JSON.parse(response);
    res.render('photos', {
      pics: d.photos.photo, 
      title: 'robyn m', 
      pageTitle: 'photos'
    });
  });
});

module.exports = router;