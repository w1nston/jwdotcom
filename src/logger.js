const winston = require('winston');
const config = require('../config/logger.config');

module.exports = new (winston.Logger)(config);
