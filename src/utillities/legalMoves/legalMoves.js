import pieceTypes from '../../constants/pieceTypes';
import getPawnMoves from './pawnMoves';
import getRookMoves from './rookMoves';
import getKnightMoves from './knightMoves';
import getBishopMoves from './bishopMoves';
import getQueenMoves from './queenMoves';
import getKingMoves from './kingMoves';
import getIdx from '../rowColToIndexUtility';

const getLegalMoves = (row, col, squares) => {
  const getPieceType = () => {
    return squares[getIdx(row, col)].piece.type;
  };

  const pieceType = getPieceType();
  let moves;
  switch (pieceType) {
    case pieceTypes.BP:
    case pieceTypes.WP:
      moves = getPawnMoves(pieceType === pieceTypes.WP, row, col, squares);
      break;
    case pieceTypes.BR:
    case pieceTypes.WR:
      moves = getRookMoves(row, col, squares);
      break;
    case pieceTypes.BN:
    case pieceTypes.WN:
      moves = getKnightMoves(row, col, squares);
      break;
    case pieceTypes.BB:
    case pieceTypes.WB:
      moves = getBishopMoves(row, col, squares);
      break;
    case pieceTypes.BQ:
    case pieceTypes.WQ:
      moves = getQueenMoves(row, col, squares);
      break;
    case pieceTypes.BK:
    case pieceTypes.WK:
      moves = getKingMoves(row, col, squares);
      break;
    case pieceTypes.ES:
    default:
      moves = [];
      break;
  }
  return moves;
};

export default getLegalMoves;
