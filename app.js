var createError = require('http-errors'); // błędy http
var cookieSession = require('cookie-session');
var express = require('express'); // server
var path = require('path'); // pobieranie ścieżek
var cookieParser = require('cookie-parser'); // wpiera paarsowanie cookies
var logger = require('morgan'); // zrzucanie logów w trybie developerskim
var config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');
var newsRouter = require('./routes/news');
var adminRouter = require('./routes/admin');

var app = express(); // odpalamy server

// view engine setup
app.set('views', path.join(__dirname, 'views')); // szablony, widoki tworzone w pug?
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // coś z formularzami, automatyczne parsowanie ?
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// deklaracja plików statycznych
app.use(cookieSession({
  name: 'session',
  keys: config.keySession,

  // Cookie Options
  maxAge: config.maxAgeSession,
}))

app.use(function(req, res, next) { // ogarnia aktualny path w routingu
  res.locals.path = req.path;
  
  next();
});

app.use('/', indexRouter); // deklaracja routingow
app.use('/news', newsRouter); // deklaracja routingow
app.use('/quiz', quizRouter); // deklaracja routingow
app.use('/admin', adminRouter); // deklaracja routingow

// catch 404 and forward to error handler
app.use(function(req, res, next) { // wyłapywanie błędów
  next(createError(404)); // adresy które nie istnieją
}); // korzysta z http-errors

// error handler
app.use(function(err, req, res, next) { // dalej błędy 500
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
