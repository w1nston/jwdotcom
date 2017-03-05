import express from 'express';
import favicon from 'serve-favicon';
import logger from 'logger';
import path from 'path';
import reactApplication from './middleware/reactApplication';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(favicon(path.join(__dirname, '../public', 'favicon.png')));
server.use('/assets', express.static('./public/assets'));

server.get('/*', reactApplication);

server.listen(PORT);
logger.info(`Server started. Listening in on port ${PORT}`);
