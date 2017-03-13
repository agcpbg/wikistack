var express = require('express');
var router = express.Router();
var models = require('../models');
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

    models.Page.findAll({

        where: {
            authorId: req.params.id
        }

    })
    .then(function(pages){
        console.log(pages);
        res.render('index', {title: 'Author Pages', pages: pages})

    })
})