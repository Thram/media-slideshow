import { compact } from 'lodash';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default (reducers, options = { devTools: false, logger: false }) => {
  const middlewares = compact([thunk, options.logger && logger]);
  const extensions = compact([
    options.devTools &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    autoRehydrate(),
    applyMiddleware(...middlewares),
  ]);
  const store = compose(...extensions)(createStore)(reducers);
  persistStore(store);
  return store;
};
