const userDb = require('../db/user');

// Get next integer
module.exports.getNext = function(req, res, next) {
  req.logger.info({
    message: 'requesting getNext',
  });
  userDb.getNext(req.token).then(function(data) {
    res.status(200);
    res.json({
        value: parseInt(data),
    });
  })
  .catch(function(err) {
    req.logger.error({
      error: err,
    });
    res.status(500);
    res.json({
      message: 'Internal Server Error',
    });
  });
  req.logger.info({
    message: 'response getNext',
    totalTime: new Date() - req.time,
  });
};

// Get current integer
module.exports.getCurrent = function(req, res, next) {
  req.logger.info({
    message: 'requesting getCurrent',
  });
  console.log(req.token);
  userDb.getCurrent(req.token).then(function(data) {
    res.status(200);
    res.json({
        value: parseInt(data),
    });
  })
  .catch(function(err) {
    req.logger.error({
      error: err,
    });
    res.status(500);
    res.json({
      message: 'Internal Server Error',
    });
  });
  req.logger.info({
    message: 'response getCurrent',
    totalTime: new Date() - req.time,
  });
};

// Update current integer
module.exports.resetCurrent = function(req, res, next) {
  req.logger.info({
    message: 'requesting resetCurrent',
  });
  if (req.body.current) {
      userDb.resetCurrent(req.token, parseInt(req.body.current))
      .then(function() {
        res.status(204);
        res.json();
      })
      .catch(function(err) {
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
      message: 'current value is required',
    });
  }
  req.logger.info({
    message: 'response resetCurrent',
    totalTime: new Date() - req.time,
  });
};
