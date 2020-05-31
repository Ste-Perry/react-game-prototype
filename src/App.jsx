import React from 'react';
import '@babel/polyfill';
import '@styles/css/main.css';
import { Provider } from 'react-redux';
import store from '@redux/store';
import AntiChess from '@pages/AntiChess.jsx';

const App = () => (
  <>
    <Provider store={store}>
      <AntiChess />
    </Provider>
  </>
);

export default App;
