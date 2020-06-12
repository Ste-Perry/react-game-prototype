import pieceTypes from '@constants/pieceTypes';
import { getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import { getIdxFromRowCol } from './rowColToIndexUtility';

export const isEnemyPiece = (pieceType, isWhite) => {
  const targetIsWhite =
    pieceType === pieceTypes.WHITE_PAWN ||
    pieceType === pieceTypes.WHITE_ROOK ||
    pieceType === pieceTypes.WHITE_KNIGHT ||
    pieceType === pieceTypes.WHITE_BISHOP ||
    pieceType === pieceTypes.WHITE_QUEEN ||
    pieceType === pieceTypes.WHITE_KING;
  return (targetIsWhite && !isWhite) || (!targetIsWhite && isWhite);
};

export const isEmptyIfFriendlyCaptured = (pieceType, isWhite, checkingAttacks) => {
  return checkingAttacks && !isEnemyPiece(pieceType, isWhite);
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
