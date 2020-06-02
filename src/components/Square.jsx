import React from 'react';
import PropTypes from 'prop-types';
import store from '@redux/store';
import { getRowColFromSquareName } from '@utilities/squareNameUtility';
import pieceTypes from '@constants/pieceTypes';
import images from '@img/images';

// box coordinates are absolute, not relative to game board
const Square = ({ idx, squareName }) => {
  const size = 100;
  const { row, col } = getRowColFromSquareName(squareName);
  const square = store.getState().squares[idx];
  const left = col * size;
  const top = row * size;

  const getSquareImage = () => {
    return images[square.piece.type];
  };

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

  const getHighlightSquareColor = () => {
    if (square.highlightedSquareToMoveTo) {
      return 'seagreen';
    }
    return 'yellow';
  };

  const getPieceSize = () => {
    if (square.piece.type === pieceTypes.BLACK_PAWN || square.piece.type === pieceTypes.WHITE_PAWN) {
      return size - 40;
    }
    return size - 20;
  };

  return (
    <div
      style={{
        display: 'table',
        position: 'absolute',
        border: 'solid 1px black',
        width: size,
        height: size,
        color: 'red',
        margin: 'auto',
        backgroundColor: square.highlightedPieceToMove || square.highlightedSquareToMoveTo ? getHighlightSquareColor() : getSquareColor(),
        left,
        top,
      }}
    >
      {square.piece && square.piece.type !== pieceTypes.EMPTY_SQUARE && (
        <div
          style={{
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center',
          }}
        >
          <img width={getPieceSize()} height={getPieceSize()} src={getSquareImage()} alt={square.piece.type} />
        </div>
      )}
    </div>
  );
};

Square.propTypes = {
  idx: PropTypes.number,
  squareName: PropTypes.string,
};
Square.defaultProps = {
  idx: -1,
  squareName: '',
};

export default Square;
