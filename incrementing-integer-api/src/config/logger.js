const bunyan = require('bunyan');
// Log configuration
module.exports.logger = bunyan.createLogger({
  name: 'incrementing-integer-api',
});
