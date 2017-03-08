const jwt = require('jwt-simple');
const jwtConfig = require('../config/jwt');
const userDb = require('../db/user');

// Authentication controller
module.exports.auth = function(req, res, next) {
  req.logger.info({
    message: 'requesting create user',
  });
  // Verify required fields
  if (req.body.email && req.body.password) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };
    const token = jwt.encode(payload, jwtConfig.jwtSecret);
    userDb.createUser(token).then(function() {
      res.status(201);
      res.json({
          access_token: token,
      });
    }).catch(function(err) {
      req.logger.error({
        error: err,
      });
      res.status(500);
      res.json({
          message: 'Internal Server Error',
      });
    });
  } else {
    res.status(400);
    res.json({
        message: 'Bad Request',
    });
  }
  req.logger.info({
    message: 'response create user',
    totalTime: new Date() - req.time,
  });
};
