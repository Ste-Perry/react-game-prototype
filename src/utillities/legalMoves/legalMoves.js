import pieceTypes from '../../constants/pieceTypes';
import getPawnMoves from './pawnMoves';
import getRookMoves from './rookMoves';
import getKnightMoves from './knightMoves';
import getBishopMoves from './bishopMoves';
import getQueenMoves from './queenMoves';
import getKingMoves from './kingMoves';
import { getIdx } from '../rowColToIndexUtility';

const getLegalMoves = (row, col, squares) => {
  const getPieceType = () => {
    return squares[getIdx(row, col)].piece.type;
  };

  const pieceType = getPieceType();
  let moves;
  switch (pieceType) {
    case pieceTypes.BLACK_PAWN:
    case pieceTypes.WHITE_PAWN:
      moves = getPawnMoves(pieceType === pieceTypes.WHITE_PAWN, row, col, squares);
      break;
    case pieceTypes.BLACK_ROOK:
    case pieceTypes.WHITE_ROOK:
      moves = getRookMoves(pieceType === pieceTypes.WHITE_ROOK, row, col, squares);
      break;
    case pieceTypes.BLACK_KNIGHT:
    case pieceTypes.WHITE_KNIGHT:
      moves = getKnightMoves(pieceType === pieceTypes.WHITE_KNIGHT, row, col, squares);
      break;
    case pieceTypes.BLACK_BISHOP:
    case pieceTypes.WHITE_BISHOP:
      moves = getBishopMoves(pieceType === pieceTypes.WHITE_BISHOP, row, col, squares);
      break;
    case pieceTypes.BLACK_QUEEN:
    case pieceTypes.WHITE_QUEEN:
      moves = getQueenMoves(pieceType === pieceTypes.WHITE_QUEEN, row, col, squares);
      break;
    case pieceTypes.BLACK_KING:
    case pieceTypes.WHITE_KING:
      moves = getKingMoves(pieceType === pieceTypes.WHITE_KING, row, col, squares);
      break;
    case pieceTypes.EMPTY_SQUARE:
    default:
      moves = [];
      break;
  }
  return moves;
};

export default getLegalMoves;
