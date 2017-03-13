const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const router = require('./routes/wiki.js');
const models = require('./models')

//nunjucks
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', {noCache: true});

//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/wiki', router);

app.get('/', function(req, res, next) {
  res.render('index');
});

models.User.sync({})
	.then(function() {
		return models.Page.sync({});
	})
	.then(function() {
		app.listen(3000, function() {
			console.log('Server is listening on port 3000');
		})
	})
	.catch(console.error)


// var server = app.listen(3000, function() {
// 	db.sync()
// 	console.log('server listening');
// });
