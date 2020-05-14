import PropTypes from 'prop-types';
import React from 'react';

const Box = ({ x = 0, y = 0 }) => {
  const size = 100;
  const left = x - size / 2;
  const top = y - size / 2;
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        backgroundColor: 'red',
        left,
        top,
      }}
    />
  );
};

Box.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
Box.defaultProps = {
  x: 0,
  y: 0,
};

export default Box;
