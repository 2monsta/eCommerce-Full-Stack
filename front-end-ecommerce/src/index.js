import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


//Redux/middleware imports

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// use ajax so we need redux-promise
import reactPromise from 'redux-promise';
// import all the reducers so all component will know
import reducers from './reducers/index'

//create the store with all the middleware(redux-promise) and the reducer
const theStoreWithMiddleWare = applyMiddleware(reactPromise)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  //Provider came from redux, it connects all the actions to reducers
  //Give it the store as props
  <Provider store={theStoreWithMiddleWare}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
