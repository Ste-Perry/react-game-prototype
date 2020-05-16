import React from 'react';
import PropTypes from 'prop-types';

// box coordinates are absolute, not relative to gameboard
const Square = ({ square }) => {
  const size = 100;
  const { row, col } = square;
  const left = col * size;
  const top = row * size;

  const getSquareColor = () => {
    const evenRow = row % 2 === 0;
    const evenCol = col % 2 === 0;
    if (evenCol && evenRow) {
      return 'white';
    }
    if (evenCol && !evenRow) {
      return 'black';
    }
    if (!evenCol && evenRow) {
      return 'black';
    }
    return 'white';
  };

  return (
    <div
      style={{
        position: 'absolute',
        border: 'solid 1px black',
        width: size,
        height: size,
        color: 'red',
        backgroundColor: getSquareColor(),
        left,
        top,
      }}
    >
      {square.piece.type}
    </div>
  );
};

Square.propTypes = {
  square: PropTypes.shape(),
};
Square.defaultProps = {
  square: {},
};

export default Square;
