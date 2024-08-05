import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import UserAdd from './component/user/userAdd';
function App() {
  return (
    <Provider store={store}>

      <UserAdd />


      
    </Provider>

  );
}

export default App;
