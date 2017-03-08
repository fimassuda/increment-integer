const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const uuid = require('uuid');
const logger = require('./config/logger').logger;
const index = require('./routes/index');
const bearerToken = require('express-bearer-token');

// Get the access_token and place in req.token
app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Set some important request log information
app.use(function(req, res, next) {
  req.logger = logger.child({
    transactionId: uuid.v4(),
    method: req.method,
    url: req.url,
  });
  req.time = new Date();
  next();
});

app.use(cors());
app.use('/v1', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
  req.logger.error(err);
});

module.exports = app;
