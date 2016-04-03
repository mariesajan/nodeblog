var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multer = require('multer');
var flash = require('connect-flash');

var routes = require('./routes/index');
var posts = require('./routes/posts');

var app = express();

app.locals.truncateText = function(bodyText, length) {
    var truncatedText = bodyText.substring(0, length);
    return truncatedText;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(function(req, res, next) {
    console.log('in app.use before messages...');
    res.locals.messages = require('express-messages')(req, res);
    console.log(res.locals.messages());
    next();
});

app.use(multer({
    dest: './public/images/uploads'
}).single('imageFile'));
app.use(cookieParser());
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/posts', posts);

app.locals.moment = require('moment');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
