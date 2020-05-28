import React from 'react';
import '@babel/polyfill';
import './styles/css/main.css';
import { Provider } from 'react-redux';
import store from '@redux/store';
import SimpleGame from './pages/SimpleGame';

const App = () => (
  <>
    <Provider store={store}>
      <SimpleGame />
    </Provider>
  </>
);

export default App;
