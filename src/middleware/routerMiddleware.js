const logger = require('../logger');

const FORBIDDEN_ERROR = new Error('Forbidden!');
FORBIDDEN_ERROR.status = 403;

const SERVER_ERROR = new Error('Something went wrong!');
SERVER_ERROR.status = 500;

module.exports.routeRequestLogger = (request, response, next) => {
  logger.info(
    `Incoming ${request.method} ` +
    `request to ${request.originalUrl}`
  );
  next();
};

module.exports.pageNotFoundRedirect = (request, response) => {
  logger.info(
    `${request.method} request to ` +
    `${request.originalUrl} returned status: 404`
  );
  response.status(404).render('404');
};

module.exports.errorPageRedirect = (error, request, response, next) => {
  const errorStatus = error.status || 500;
  logger.error(
    `${request.method} request to ` +
    `${request.originalUrl} returned status: ${errorStatus}`
  );
  logger.error(error.stack);
  response.status(errorStatus).render('500', { error });
};

module.exports.setForbiddenError = (request, response, next) => {
  next(FORBIDDEN_ERROR);
};

module.exports.noOperation = (request, response, next) => next();

module.exports.setError = (request, response, next) => next(SERVER_ERROR);

module.exports.FORBIDDEN_ERROR = FORBIDDEN_ERROR;
module.exports.SERVER_ERROR = SERVER_ERROR;