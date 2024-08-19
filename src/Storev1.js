import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullname: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit': {
      return { ...state, balance: state.balance + action.payload };
    }
    case 'account/withdraw': {
      return { ...state, balance: state.balance - action.payload };
    }
    case 'account/requestLoan': {
      if (state.loan > 0) return;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    }

    case 'account/payLoan': {
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    }

    default: {
      return state;
    }
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/editCustomer':
      return { ...state, fullname: action.payload };
    default: {
      return state;
    }
  }
}

// store.dispatch({ type: 'account/deposit', payload: 500 });

// store.dispatch({
//   type: 'account/requestLoan',
//   payload: {
//     amount: 500,
//     purpose: 'Buy a car',
//   },
// });

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdrawal(amount) {
  return { type: 'account/withdrawal', payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}
function payLoan() {
  return { type: 'account/payLoan' };
}

function createCustomer(fullname, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullname, nationalID, createdAt: new Date().toISOString() },
  };
}

function editCustomer(fullname) {
  return {
    type: 'customer/editCustomer',
    payload: fullname,
  };
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
store.dispatch(requestLoan(500, 'get a new car'));
store.dispatch(createCustomer('Demilade', '223344535'));
console.log(deposit(500));
console.log(store.getState());
