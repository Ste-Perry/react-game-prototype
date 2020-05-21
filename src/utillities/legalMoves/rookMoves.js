import {
  isEnemyPiece,
  addMoveFromCurCol,
  addMoveFromCurRow,
  decrementer,
  getFromCurCol,
  getFromCurRow,
  incrementer,
  maxBound,
  minBound,
} from '../movesUtility';
import pieceTypes from '../../constants/pieceTypes';

const getRookMoves = (isWhite, row, col, squares) => {
  // many possible moves along any col or row
  const moves = [];

  const checkMoves = (location, updateLocation, checkBound, getPieceIndex, addMove) => {
    let curLoc = updateLocation(location);
    while (checkBound(curLoc)) {
      const pieceType = squares[getPieceIndex(curLoc)].piece.type;
      if (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, isWhite)) {
        addMove(curLoc);
        curLoc = updateLocation(curLoc);
        // can't move beyond the enemy piece
        if (pieceType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(pieceType, isWhite)) {
          break;
        }
      } else {
        break; // must be our piece
      }
    }
  };

  checkMoves(row, decrementer, minBound, getFromCurRow(col), addMoveFromCurRow(moves, col));
  checkMoves(row, incrementer, maxBound, getFromCurRow(col), addMoveFromCurRow(moves, col));
  checkMoves(col, decrementer, minBound, getFromCurCol(row), addMoveFromCurCol(moves, row));
  checkMoves(col, incrementer, maxBound, getFromCurCol(row), addMoveFromCurCol(moves, row));
  return moves;
};

export default getRookMoves;
