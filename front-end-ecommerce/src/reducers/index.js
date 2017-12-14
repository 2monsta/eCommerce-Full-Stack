// this is the master reducer
// reducers contains a piece of state
//the root reducer contains all the reducers
// roo reducer contains all piece of state


import {combineReducers} from 'redux';
import ProductLineReducer from './ProductLineReducer';
// 1. import auth reducer
import AuthReducer from './AuthReducer';
// combineReducer takes key:value pair
  // stateName: reducerFunction
const rootReducers = combineReducers({
  auth: AuthReducer,
  pl: ProductLineReducer
});

export default rootReducers;