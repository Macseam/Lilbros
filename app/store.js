'use strict';

import { createStore, compose, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers';

const NODE_ENV = process.env.NODE_ENV || 'production';

const logger = createLogger({
  diff: true,
  level: {
    prevState: () => `info`,
    action: () => `log`,
    error: () => `error`,
    nextState: () => `info`,
  },
  colors: {
    prevState: () => `#FFEB3B`,
    action: () => `red`,
    nextState: () => `#4CAF50`,
  },
  duration: true,
  collapsed: true
});

const router = routerMiddleware(hashHistory);

const enhancer = compose( applyMiddleware(thunk, router, logger, authChecker) );

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  //const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  if (module.hot) {
    module.hot.accept('../redux/reducers', () =>
      store.replaceReducer(require('../redux/reducers').default)
    );
  }

  return store;
}
