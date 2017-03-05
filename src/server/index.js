import express from 'express';
import logger from 'logger';
import reactApplication from './middleware/reactApplication';

const server = express();
const PORT = process.env.PORT || 3000;

server.use('/assets', express.static('./public/assets'));

server.get('/*', reactApplication);

server.listen(PORT);
logger.info(`Server started. Listening in on port ${PORT}`);
