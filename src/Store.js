import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './features/accountFeatures/accountSlices';
import customerReducer from './features/consumerFeatures/customerSlices';

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
