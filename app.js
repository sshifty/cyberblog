var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require("mongoose");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");


require('dotenv').config();
require('./config/passport'); 

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true , useUnifiedTopology: true})
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Mongoose connection error'))

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname,"./client/build")));

app.use(compression());
app.use(helmet());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
