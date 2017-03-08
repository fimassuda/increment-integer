const passport = require('passport');
const userDb = require('./db/user');
const Strategy = require('passport-http-bearer').Strategy;
const debug = require('debug')('iiapi:auth');

// Strategy to authenticate the user
module.exports = function() {
  passport.use(
    new Strategy(
      function(token, done) {
        userDb.findUser(token).then(function(data) {
          if (!data) {
            return done(null, false);
          }
          return done(null, data);
        })
        .catch(function(err) {
          debug(err);
          return done(err);
        });
      }
    )
  );
};
