// Health Check controller
module.exports.healthCheck = function(req, res, next) {
  req.logger.info({
    message: 'requesting health check',
  });
  res.status(200);
  res.json({
      message: 'OK',
  });
  req.logger.info({
    message: 'response health check',
    totalTime: new Date() - req.time,
  });
};
