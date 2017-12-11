import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reactPromise from 'redux-promise';
import reducers from './reducers/index'


const theStoreWithMiddleWare = applyMiddleware(reactPromise)(createStore)(reducers);
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
