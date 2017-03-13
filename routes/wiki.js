var express = require('express');
var router = express.Router();
var models = require('../models');
var Promise = require('bluebird')
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
  var pagePromise = Page.findOne({
    where: {
      urlTitle: pageName
    }
  })
  var userPromise = Page.findOne({
    where: {
      urlTitle: pageName
    }
  })
  .then(function(page) {
    return User.findOne({
       where: {
        id: page.authorId
      }
    })
  }) 
  Promise.all([pagePromise, userPromise])
    .then(function(resArr) {
      var pageRow = resArr[0];
      var userRow = resArr[1];
      res.render('wikipage', {rowObj: pageRow, userObj: userRow})
    })
  //end of router.get
})


