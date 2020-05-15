import React from 'react';
import PropTypes from 'prop-types';

// box coordinates are absolute, not relative to gameboard
const Box = ({ x, y }) => {
  const size = 100;
  const left = x - size / 2;
  const top = y - size / 2;

  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
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
