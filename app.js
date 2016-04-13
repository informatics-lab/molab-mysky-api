var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var Strategy = require('passport-local').Strategy;
var Strategy = require('passport-http').BasicStrategy;
var db = require('./services/molab-wtf');


var routes = require('./routes/index');
var ob = require('./routes/ob');

var app = express();


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function (username, password, cb) {
        db.userService.findByUsername(username).then(
            function (user) {
                if (user) {
                    if (user.password === password) {
                        //correct
                        return cb(null, user);
                    } else {
                        //incorrect password
                        return cb(null, false);
                    }
                } else {
                    //incorrect username
                    return cb(null, false);
                }
            }
        ).catch(
            function (err) {
                return cb(err);
            }
        );
    }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
//passport.serializeUser(function (user, cb) {
//    cb(null, user.username);
//});
//
//passport.deserializeUser(function (username, cb) {
//    db.userService.findByUsername(username).then(
//        function(user) {
//            return cb(null, user);
//        }
//    ).catch(
//        function (err) {
//            return cb(err);
//        }
//    );
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
//app.use(passport.session());

app.use('/', routes);
app.use('/ob', ob);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
