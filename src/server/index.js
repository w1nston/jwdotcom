import express from 'express';
import logger from 'logger';
import reactApplication from './middleware/reactApplication';

const server = express();
const PORT = process.env.PORT || 3000;

server.use('/assets', express.static('./public/assets'));

server.get('/*', reactApplication);

// server.get('*', (request, response) => {
  // match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
  //   if (error) {
  //     response
  //       .status(500)
  //       .send(error.message);
  //   } else if (redirectLocation) {
  //     response.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   } else if (renderProps) {
  //     response
  //       .status(200)
  //       .send(ReactDOMServer.renderToString(
  //         React.createElement( // <RouterContext>
  //           RouterContext,
  //           ...renderProps
  //         ) // </RouterContext>
  //       ))
  //   } else {
  //     response
  //       .status(404)
  //       .send('Not found here.');
  //   }
  // });
// });

// server.get('/', (request, response) => {
//   const title = 'jwdotcom';
//
//   response.send(template({
//     body: ReactDOMServer.renderToString(homePage()),
//     title,
//   }));
// });
//
// server.get('/blog', (request, response) => {
//   const title = 'jwdotcom - blog';
//
//   response.send(template({
//     body: ReactDOMServer.renderToString(blogPage()),
//     title,
//   }));
// });

server.listen(PORT);
logger.info(`Server started. Listening in on port ${PORT}`);
