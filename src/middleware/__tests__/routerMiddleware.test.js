const logger = require('../../logger');
const {
  errorPageRedirect,
  noOperation,
  pageNotFoundRedirect,
  routeRequestLogger,
  setError,
  setForbiddenError,
  FORBIDDEN_ERROR,
  SERVER_ERROR,
} = require('../routerMiddleware');

describe('routerMiddleware', () => {
  let response;

  beforeEach(() => {
    response = {
      status: jest.fn(() => response),
      render: jest.fn(() => response),
    };
  });

  describe('routeRequestLogger', () => {
    it('logs the request method and the requested url', () => {
      spyOn(logger, 'info');
      const request = {
        method: 'method',
        originalUrl: 'originalUrl',
      };
      const next = () => {};
      routeRequestLogger(request, response, next);
      expect(logger.info).toHaveBeenCalledWith(
        `Incoming ${request.method} ` +
        `request to ${request.originalUrl}`
      );
    });

    it('calls the next middleware', () => {
      const request = {};
      const next = jest.fn();
      routeRequestLogger(request, response, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('pageNotFoundRedirect', () => {
    it('logs the request method, the requested url and status 404', () => {
      spyOn(logger, 'info');
      const request = {
        method: 'method',
        originalUrl: 'originalUrl',
      };
      pageNotFoundRedirect(request, response);
      expect(logger.info).toHaveBeenCalledWith(
        `${request.method} request to ` +
        `${request.originalUrl} returned status: 404`
      );
    });

    it('sets status 404 on the response object', () => {
      const request = {};
      pageNotFoundRedirect(request, response);
      expect(response.status).toHaveBeenCalledWith(404);
    });

    it('renders the 404 page', () => {
      const request = {};
      pageNotFoundRedirect(request, response);
      expect(response.render).toHaveBeenCalledWith('404');
    });
  });

  describe('errorPageRedirect', () => {
    it('logs error stack', () => {
      spyOn(logger, 'error');
      const error = {
        stack: 'error stack trace',
      };
      const request = {};
      errorPageRedirect(error, request, response);
      expect(logger.error).toHaveBeenCalledWith(error.stack);
    });

    it('renders 500 error page', () => {
      const error = {};
      const request = {};
      errorPageRedirect(error, request, response);
      expect(response.render).toHaveBeenCalledWith('500', { error });
    });

    describe('when error status is defined', () => {
      const error = {
        status: 'status',
      };

      it('logs request method, the requested url, and the error status', () => {
        spyOn(logger, 'error');
        const request = {
          method: 'method',
          originalUrl: 'originalUrl',
        };
        errorPageRedirect(error, request, response);
        expect(logger.error).toHaveBeenCalledWith(
          `${request.method} request to ` +
          `${request.originalUrl} returned status: ${error.status}`
        );
      });

      it('sets the response status to the specified status', () => {
        const request = {};
        errorPageRedirect(error, request, response);
        expect(response.status).toHaveBeenCalledWith(error.status);
      });
    });

    describe('when error status is undefined', () => {
      const error = {
        status: undefined,
      };

      it('logs request method, the requested url, and the error status 500', () => {
        spyOn(logger, 'error');
        const request = {
          method: 'method',
          originalUrl: 'originalUrl',
        };
        errorPageRedirect(error, request, response);
        expect(logger.error).toHaveBeenCalledWith(
          `${request.method} request to ` +
          `${request.originalUrl} returned status: 500`
        );
      });

      it('sets response status to 500', () => {
        const request = {};
        errorPageRedirect(error, request, response);
        expect(response.status).toHaveBeenCalledWith(500);
      });
    });
  });

  describe('setForbiddenError', () => {
    it('calls next middleware with an error', () => {
      const next = jest.fn();
      setForbiddenError(null, null, next);
      expect(next).toHaveBeenCalledWith(FORBIDDEN_ERROR);
    });
  });

  describe('noOperation', () => {
    it('only calls next middleware', () => {
      const next = jest.fn();
      noOperation(null, response, next);
      expect(response.render).not.toHaveBeenCalled();
      expect(response.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('setError', () => {
    it('calls next middleware with a server error', () => {
      const next = jest.fn();
      setError(null, null, next);
      expect(next).toHaveBeenCalledWith(SERVER_ERROR)
    });
  });
});

describe('router errors', () => {
  describe('FORBIDDEN_ERROR', () => {
    it('is an error with a preset message', () => {
      expect(FORBIDDEN_ERROR).toEqual(new Error('Forbidden!'));
    });

    it('has status 403', () => {
      expect(FORBIDDEN_ERROR.status).toBe(403);
    });
  });

  describe('SERVER_ERROR', () => {
    it('is an error with a preset message', () => {
      expect(SERVER_ERROR).toEqual(new Error('Something went wrong!'));
    });

    it('has status 500', () => {
      expect(SERVER_ERROR.status).toBe(500);
    });
  });
});
