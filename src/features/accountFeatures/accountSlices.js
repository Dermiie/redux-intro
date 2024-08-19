import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdrawal(state, action) {
      state.balance = state.balance - action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance = state.balance + action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },

    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch) {
    dispatch({ type: 'account/convertingCurrency' });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedUSD = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: convertedUSD });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case 'account/deposit': {
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     }
//     case 'account/withdrawal': {
//       return { ...state, balance: state.balance - action.payload };
//     }
//     case 'account/requestLoan': {
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     }

//     case 'account/payLoan': {
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };
//     }

//     case 'account/convertingCurrency': {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/convertingCurrency' });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const convertedUSD = data.rates.USD;

//     dispatch({ type: 'account/deposit', payload: convertedUSD });
//   };
// }

// export function withdrawal(amount) {
//   return { type: 'account/withdrawal', payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: 'account/requestLoan', payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: 'account/payLoan' };
// }
