import getRookMoves from './rookMoves';
import getBishopMoves from './bishopMoves';

const getQueenMoves = (isWhite, row, col, squares) => {
  // combo of rook and bishop moves - borrow from them
  return [...getRookMoves(isWhite, row, col, squares), ...getBishopMoves(isWhite, row, col, squares)];
};

export default getQueenMoves;
