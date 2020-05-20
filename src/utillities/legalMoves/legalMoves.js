import pieceTypes from '../../constants/pieceTypes';
import getPawnMoves from './pawnMoves';
import getRookMoves from './rookMoves';
import getKnightMoves from './knightMoves';
import getBishopMoves from './bishopMoves';
import getQueenMoves from './queenMoves';
import getKingMoves from './kingMoves';
import { getIdx, getRowCol } from '../rowColToIndexUtility';
import { getRowColFromSquareName } from '../squareNameUtility';
import { isEnemyPiece } from '../movesUtility';

const getLegalMoves = (row, col, squares) => {
  const canPieceAttack = (isWhite, pieceType, targetRow, targetCol, pieceRow, pieceCol, getMoves) => {
    if (isEnemyPiece(pieceType, isWhite)) {
      const possibleMoves = getMoves(!isWhite, pieceRow, pieceCol, squares);
      for (let jdx = 0; jdx < possibleMoves.length; jdx += 1) {
        const { row: moveRow, col: moveCol } = getRowColFromSquareName(possibleMoves[jdx]);
        if (targetRow === moveRow && targetCol === moveCol) {
          return true;
        }
      }
    }
    return false;
  };

  const getMovesMethodFromType = pieceType => {
    switch (pieceType) {
      case pieceTypes.WHITE_PAWN:
      case pieceTypes.BLACK_PAWN:
        return getPawnMoves;
      case pieceTypes.WHITE_ROOK:
      case pieceTypes.BLACK_ROOK:
        return getRookMoves;
      case pieceTypes.WHITE_KNIGHT:
      case pieceTypes.BLACK_KNIGHT:
        return getKnightMoves;
      case pieceTypes.WHITE_BISHOP:
      case pieceTypes.BLACK_BISHOP:
        return getBishopMoves;
      case pieceTypes.WHITE_QUEEN:
      case pieceTypes.BLACK_QUEEN:
        return getQueenMoves;
      case pieceTypes.WHITE_KING:
      case pieceTypes.BLACK_KING:
        return getKingMoves;
      case pieceTypes.EMPTY_SQUARE:
      default:
        return () => [];
    }
  };

  const canEnemyAttack = (isWhite, targetRow, targetCol) => {
    for (let idx = 0; idx < 64; idx += 1) {
      const pieceType = squares[idx].piece.type;
      const { row: pieceRow, col: pieceCol } = getRowCol(idx);
      if (canPieceAttack(isWhite, pieceType, targetRow, targetCol, pieceRow, pieceCol, getMovesMethodFromType(pieceType))) {
        return true;
      }
    }
    return false;
  };

  const getLegalKingMoves = isWhite => {
    const kingMoves = [];
    const possibleMoves = getKingMoves(isWhite, row, col, squares);
    possibleMoves.forEach(move => {
      const { row: squareRow, col: squareCol } = getRowColFromSquareName(move);
      if (!canEnemyAttack(isWhite, squareRow, squareCol)) {
        kingMoves.push(move);
      }
    });
    return kingMoves;
  };

  const pieceType = squares[getIdx(row, col)].piece.type;
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
      moves = getLegalKingMoves(pieceType === pieceTypes.WHITE_KING);
      break;
    case pieceTypes.EMPTY_SQUARE:
    default:
      moves = [];
      break;
  }
  return moves;
};

export default getLegalMoves;
