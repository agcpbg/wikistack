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
  // req.body
  User.findOrCreate({
    where: {
      name: req.body.author,
      email: req.body.email
    }
  })
  .then(function(user){

    var author = user[0];

    return Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    })
    .then(function(page){
      return page.setAuthor(author);
    })
  })
  .then(function(createdPage) {

    res.redirect(createdPage.route);
  })
  .catch(console.error);

});

router.get('/add', function(req, res, next) {
  res.render('addpage.html');
});


router.get('/:pageName', function(req, res, next){
  let pageName = req.params.pageName;

  Page.findOne({
    where: {
      urlTitle: pageName
    }
  })
  .then(function(page){
    res.render('wikipage', {rowObj: page});
  })
  .catch(next);

});

