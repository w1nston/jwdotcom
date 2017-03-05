import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import template from '../../template';
import RootComponent from '../../../client/components/rootComponent';
import rootReducer from '../../../shared/reducers/index';

export default function reactApplication(request, response) {
  const store = createStore(rootReducer);

  const appString = renderToString(
    React.createElement(
      Provider,
      { store },
      React.createElement(RootComponent, {
        Router,
        location: request.url,
        context: {},
      })
    )
  );

  const html = template({
    body: appString,
    state: store.getState(),
  });

  response.status(200).send(html);
}
