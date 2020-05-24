import getRookMoves from './rookMoves';
import getBishopMoves from './bishopMoves';

const getQueenMoves = (isWhite, row, col, squares, checkingAttacks = false) => {
  // combo of rook and bishop moves - borrow from them
  return [...getRookMoves(isWhite, row, col, squares, checkingAttacks), ...getBishopMoves(isWhite, row, col, squares, checkingAttacks)];
};

export default getQueenMoves;
