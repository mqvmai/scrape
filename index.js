var exp = require('express');
var users = require('./routes/users');
var birds = require('./routes/birds');
var reddit = require('./routes/reddit');
var app = exp();

/* app.use: run this on ALL requests
   app.get: run this on GET request for given URL */

/* virtual path prefix(since /static doesnt exist in the file system)
for files served by express.static, so all assets live in localhost:3000/static */
app.use('/static', exp.static('public'));

/* set engine to render handlebars instead of html or jade */
app.set('view engine', 'hbs');

var counter = 1;

/* app.METHOD = middle ware.  will execute in ORDER it is declared */
/* requests must be after the middleware for the middleware to run before */
/* middleware has full access to request and response object */

app.get('/dontcallmiddleware', function(req, res, next) {
  res.send('dont call middleware');
});

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.use(function logger(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
});

app.use(function(req, res, next) {
  console.log('request #' + counter++);
  next();
});

// invoked for any request starting with /help
app.use('/help', function(req, res, next) {
  console.log('%s', req.path);    //returns '/hi'
  next();
});

app.get('/help/hi', function(req, res){
  res.send('help page');
});

app.use('/users', users);
app.use('/reddit', reddit);
app.use('/birds', birds);
var numbers = [{number: 1, hey: true},
               {number: 2, hey: false},
               {number: 3, hey: true},
               {number: 123123, maybe: true},
               {number: 414, maybe: false}];
var renderPage = function(res, req, title, body){
  console.log(req.path);
  res.render('main', { title: title, body: body, number: numbers});
};

app.get('/', function(req, res){
  renderPage(res, req, 'Main Page', '<p>Hi</p> there and welcome to this site.');
});

/* if no route matches, it'll run this, ALWAYS PUT THIS ERROR HANDLING AT THE END */
// app.use("*",function(req,res){
//   res.status(404).send("Sorry this doesn't match any route");
// });
app.get('*',function(req,res){
  renderPage(res, req, '404', 'No path matches that route, sorry.');
});


app.listen(3000,function(){
  console.log("Live at Port 3000");
});

exports = module.exports = app;
