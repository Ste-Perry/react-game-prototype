import { getRookMoves, isLegalRookMove } from './rookMoves';
import { getBishopMoves, isLegalBishopMove } from './bishopMoves';

export const getQueenMoves = ({ isWhite, from, squares, checkingAttacks = false }) => {
  // combo of rook and bishop moves - borrow from them
  return [...getRookMoves({ isWhite, from, squares, checkingAttacks }), ...getBishopMoves({ isWhite, from, squares, checkingAttacks })];
};

export const isLegalQueenMove = ({ from, to, squares, checkingAttacks = false }) => {
  return isLegalRookMove({ from, to, squares, checkingAttacks }) || isLegalBishopMove({ from, to, squares, checkingAttacks });
};
