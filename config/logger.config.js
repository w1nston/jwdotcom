const dateFns = require('date-fns');
const winston = require('winston');

const consoleTransport = new winston.transports.Console({
  timestamp() {
    const now = new Date();
    return dateFns.getTime(now);
  },
  formatter(options) {
    const timestamp = options.timestamp();
    return `[${dateFns.format(timestamp)}][${timestamp}][${options.level.toUpperCase()}] ` +
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
