import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './normalize.scss';
import 'animate.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

window.__REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__ || compose();

const store = createStore(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
