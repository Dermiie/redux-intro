import CreateCustomer from './features/consumerFeatures/CreateCustomer';
import Customer from './features/consumerFeatures/Customer';
import AccountOperations from './features/accountFeatures/AccountOperations';
import BalanceDisplay from './features/accountFeatures/BalanceDisplay';
import { useSelector } from 'react-redux';

function App() {
  const fullname = useSelector((store) => store.customer.fullname);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!fullname ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
