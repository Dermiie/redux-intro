import { applyMiddleware, combineReducers, createStore } from 'redux';
import accountReducer from './features/accountFeatures/accountSlices';
import customerReducer from './features/consumerFeatures/customerSlices';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
