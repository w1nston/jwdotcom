const moment = require('moment'); // TODO: Use different lib, immutable dates
const winston = require('winston');

const consoleTransport = new winston.transports.Console({
  timestamp() {
    return moment().toISOString();
  },
  formatter(options) {
    return `[${options.timestamp()}][${options.level.toUpperCase()}] ` +
      `${options.message}`;
  },
});

const fileInfoTransport = new winston.transports.File({
  name: 'info-file',
  filename: `./logs/info.${process.env.NODE_ENV}.log`,
  level: 'info',
});

const fileErrorTransport = new winston.transports.File({
  name: 'error-file',
  filename: `./logs/error.${process.env.NODE_ENV}.log`,
  level: 'error',
});

module.exports = {
  transports: [consoleTransport, fileInfoTransport, fileErrorTransport],
};
