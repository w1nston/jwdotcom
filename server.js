const http = require('http');
const app = require('./src/app');
const logger = require('./src/logger');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

server.on('listening', () => logger.info(`Server started. Listening in on port ${port}`));
server.on('error', error => logger.error('Server error!', error));
