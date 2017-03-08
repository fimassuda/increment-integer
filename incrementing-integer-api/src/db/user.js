const redis = require('redis');
const debug = require('debug')('iiapi:db');
const redisClient = redis.createClient({
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
});
redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

module.exports.createUser = function(token) {
  debug('request createUser');
  return new Promise(function(resolve, reject) {
      redisClient.set(token, 0, function(err, data) {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports.findUser = function(token) {
  console.log(token);
  debug('request finduser');
  return new Promise(function(resolve, reject) {
    redisClient.get(token, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports.getCurrent = function(token) {
  debug('request getCurrent');
  return new Promise(function(resolve, reject) {
    redisClient.get(token, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports.getNext = function(token) {
  debug('request getNext');
  return new Promise(function(resolve, reject) {
    redisClient.get(token, function(err, value) {
      if (err) reject(err);
      else {
        value++;
        redisClient.set(token, value, function(err, data) {
          if (err) reject(err);
          else resolve(value++);
        });
      }
    });
  });
};

module.exports.resetCurrent = function(token, value) {
  debug('request resetCurrent');
  return new Promise(function(resolve, reject) {
    redisClient.set(token, value, function(err, data) {
      if (err) reject(err);
      else resolve();
    });
  });
};
