import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootComponent from '../shared/components/rootComponent';
import rootReducer from '../shared/reducers';

const state = window.__INITIAL_STATE__;
const store = createStore(rootReducer, state);

render(
  <Provider store={store}>
    <RootComponent Router={Router} location={state.location} />
  </Provider>,
  document.getElementById('root')
);
