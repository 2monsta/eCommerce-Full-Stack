import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// use ajax so we need redux-promise
import reactPromise from 'redux-promise';
import reducers from './reducers/index'

//create the store
const theStoreWithMiddleWare = applyMiddleware(reactPromise)(createStore)(reducers);
ReactDOM.render(
  <Provider store={theStoreWithMiddleWare}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
