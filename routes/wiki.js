var express = require('express');
var router = express.Router();
var models = require('../models');
module.exports = router;

var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  })
    .then(function(createdPage) {
      res.json(createdPage);
    })
    .catch(console.error);

  // res.json(req.body);
});

router.get('/add', function(req, res, next) {
  res.render('addpage.html');
});
