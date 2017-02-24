const winston = require('winston');
const config = require('../../config/logger.config.js');

module.exports = new (winston.Logger)(config);
