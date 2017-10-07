import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers';
import createStore from './store';
import ErrorHandler from './components/ErrorHandler';
import ContentProvider from './containers/ContentProvider';
import App from './containers/App';
import './styles/main.css';

const store = createStore(reducers, { logger: process.env.NODE_ENV === 'development' });

render(
  <ErrorHandler>
    <Provider store={store}>
      <ContentProvider>
        <App />
      </ContentProvider>
    </Provider>
  </ErrorHandler>,
  document.getElementById('app'),
);
