import pieceTypes from '@constants/pieceTypes';
import { getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import { getIdxFromRowCol } from '@utilities/rowColToIndexUtility';
import { getAllMoveSquares, pieceIsWhite } from '@utilities/squareUtility';

export const isEnemyPiece = (pieceType, isWhite) => {
  if (pieceType === pieceTypes.EMPTY_SQUARE) {
    return false;
  }
  const targetIsWhite = pieceIsWhite(pieceType);
  return (targetIsWhite && !isWhite) || (!targetIsWhite && isWhite);
};

export const isEmptyIfFriendlyCaptured = ({ pieceType, isWhite, checkingAttacks, kingAttack }) => {
  return checkingAttacks && kingAttack && !isEnemyPiece(pieceType, isWhite);
};

export const checkMovesBetween = ({ checkMove, isWhite, from, to, squares, checkingAttacks }) => {
  const squaresBetween = getAllMoveSquares({ from, to, squares });
  for (let idx = 0; idx < squaresBetween.length; idx += 1) {
    const pieceType = squaresBetween[idx].piece.type;
    const { row: pieceRow, col: pieceCol } = squaresBetween[idx];
    if (!checkMove({ isWhite, pieceType, checkingAttacks, kingAttack: pieceRow === to.row && pieceCol === to.col })) {
      return false;
    }
  }
  return true;
};

export const incrementer = count => count + 1;
export const decrementer = count => count - 1;
export const minBound = rowOrCol => rowOrCol >= 0;
export const maxBound = rowOrCol => rowOrCol <= 7;
export const minMaxBound = rowOrCol => minBound(rowOrCol) && maxBound(rowOrCol);
export const getFromCurRow = col => curRow => getIdxFromRowCol(curRow, col);
export const getFromCurCol = row => curCol => getIdxFromRowCol(row, curCol);
export const addMoveFromCurRow = (moves, col) => curRow => moves.push(getSquareNameFromRowCol(curRow, col));
export const addMoveFromCurCol = (moves, row) => curCol => moves.push(getSquareNameFromRowCol(row, curCol));
