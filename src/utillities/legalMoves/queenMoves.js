import getRookMoves from './rookMoves';
import getBishopMoves from './bishopMoves';

const getQueenMoves = (isWhite, row, col, squares) => {
  // combo of rook and bishop moves - borrow from them
  const moves = [];
  moves.push(getRookMoves(isWhite, row, col, squares));
  moves.push(getBishopMoves(isWhite, row, col, squares));
  return moves;
};

export default getQueenMoves;
