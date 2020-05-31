import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const title = 'Simple Game';

ReactDOM.render(<App title={title} />, document.getElementById('app'));

module.hot.accept();
