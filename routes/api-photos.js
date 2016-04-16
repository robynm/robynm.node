var express = require('express');
var router = express.Router();
var Photos = require('../models/photos');

router.get('/', function(req, res, next) {

  Photos.getPhotos( {'requestType': 'flickr.people.getPublicPhotos', 'per_page': '12', 'page': '1'}, function(response) {
    res.json(JSON.parse(response));
  });
});

router.post('/', function(req, res, next) {

  Photos.getPhotos( {'requestType': 'flickr.people.getPublicPhotos', 'per_page': '12', 'page': req.body.page}, function(response) {
    res.json(JSON.parse(response));
  });
});

module.exports = router;
