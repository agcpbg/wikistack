var express = require('express');
var router = express.Router();
var models = require('../models');
var Promise = require('bluebird')
module.exports = router;

var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){

  models.User.findAll()
    .then(function(allUsers){

      res.render('index', {title: 'Users', pages: allUsers});

    });

});

router.get('/:id', function(req, res, next){
    var userPromise = models.User.findAll({
        where: {
            id: req.params.id
        }
    })
    var pagePromise = models.Page.findAll({
        where: {
            authorId: req.params.id
        }
    })
    Promise.all([userPromise, pagePromise])
        .then(function(resArr) {
            var user = resArr[0][0];
            console.log('user', user)
            var pages = resArr[1];
            console.log('pages', pages)
            res.render('users', {user: user, pages: pages})
        }).catch (console.error)
    
})