var express = require('express');
var router = express.Router();
var Photos = require('../models/photos');

router.get('/', function(req, res, next) {
  res.render('photos', {
    title: 'robyn meshulam', 
    page_title: 'photos'
  });
});

module.exports = router;
