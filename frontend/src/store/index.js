// src/store/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import cookiesReducer from './reducers/cookiesReducer';
import authReducer from './reducers/authReducers';
;
const middleware = [thunk];
const rootReducer = combineReducers({
  cookies: cookiesReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
