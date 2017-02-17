const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const homeController = require('./controllers/homeController');
const {
  errorPageRedirect,
  noOperation,
  pageNotFoundRedirect,
  routeRequestLogger,
  setError,
  setForbiddenError,
} = require('./middleware/routerMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(routeRequestLogger);

app.get('/', homeController.index);

app.use('/blog', blogRoutes);

app.use(pageNotFoundRedirect);
app.use(errorPageRedirect);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;
