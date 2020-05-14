import React from 'react';
import PropTypes from 'prop-types';
import SimpleGame from './pages/SimpleGame';
import 'regenerator-runtime/runtime';

const App = ({ title }) => (
  <>
    <div>
      <h1>{title}</h1>
    </div>
    ;
    <SimpleGame />
  </>
);

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
