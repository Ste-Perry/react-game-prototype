import pieceTypes from '@constants/pieceTypes';
import { getIdx, getRowCol } from '@utilities/rowColToIndexUtility';
import { getRowColFromSquareName } from '@utilities/squareNameUtility';
import { isEnemyPiece } from '@utilities/movesUtility';
import { getPawnMoves, isLegalPawnMove } from './pawnMoves';
import { getRookMoves, isLegalRookMove } from './rookMoves';
import { getKnightMoves, isLegalKnightMove } from './knightMoves';
import { getBishopMoves, isLegalBishopMove } from './bishopMoves';
import { getQueenMoves, isLegalQueenMove } from './queenMoves';
import { getKingMoves, isLegalKingMove } from './kingMoves';

const canPieceAttack = ({ isWhite, pieceType, from, to, isLegalMoveCallback, squares }) => {
  return isEnemyPiece(pieceType, isWhite) && isLegalMoveCallback({ from, to, squares });
};

const getCallbackFromPieceType = ({ pieceType, getAllMoves }) => {
  switch (pieceType) {
    case pieceTypes.WHITE_PAWN:
    case pieceTypes.BLACK_PAWN:
      return getAllMoves ? getPawnMoves : isLegalPawnMove;
    case pieceTypes.WHITE_ROOK:
    case pieceTypes.BLACK_ROOK:
      return getAllMoves ? getRookMoves : isLegalRookMove;
    case pieceTypes.WHITE_KNIGHT:
    case pieceTypes.BLACK_KNIGHT:
      return getAllMoves ? getKnightMoves : isLegalKnightMove;
    case pieceTypes.WHITE_BISHOP:
    case pieceTypes.BLACK_BISHOP:
      return getAllMoves ? getBishopMoves : isLegalBishopMove;
    case pieceTypes.WHITE_QUEEN:
    case pieceTypes.BLACK_QUEEN:
      return getAllMoves ? getQueenMoves : isLegalQueenMove;
    case pieceTypes.WHITE_KING:
    case pieceTypes.BLACK_KING:
      return getAllMoves ? getKingMoves : isLegalKingMove;
    case pieceTypes.EMPTY_SQUARE:
    default:
      return () => [];
  }
};

const canEnemyAttack = ({ isWhite, to, squares }) => {
  for (let idx = 0; idx < 64; idx += 1) {
    const pieceType = squares[idx].piece.type;
    const from = getRowCol(idx);
    if (canPieceAttack({ isWhite, pieceType, from, to, isLegalMoveCallback: getCallbackFromPieceType({ pieceType, getAllMoves: false }) })) {
      console.log(`cannot move to row ${to.row}, col ${to.col} - can be attacked by piece ${pieceType} at row ${from.row}, col ${from.col}`);
      return true;
    }
  }
  return false;
};

const getLegalKingMoves = ({ isWhite, from, squares }) => {
  const kingMoves = [];
  const possibleMoves = getKingMoves({ isWhite, from, squares });
  possibleMoves.forEach(move => {
    const to = getRowColFromSquareName(move);
    if (!canEnemyAttack({ isWhite, to })) {
      kingMoves.push(move);
    }
  });
  return kingMoves;
};

export const getLegalMoves = ({ from, squares }) => {
  const pieceType = squares[getIdx(from.row, from.col)].piece.type;
  let moves;
  switch (pieceType) {
    case pieceTypes.BLACK_PAWN:
    case pieceTypes.WHITE_PAWN:
      moves = getPawnMoves({ isWhite: pieceType === pieceTypes.WHITE_PAWN, from, squares });
      break;
    case pieceTypes.BLACK_ROOK:
    case pieceTypes.WHITE_ROOK:
      moves = getRookMoves({ isWhite: pieceType === pieceTypes.WHITE_ROOK, from, squares });
      break;
    case pieceTypes.BLACK_KNIGHT:
    case pieceTypes.WHITE_KNIGHT:
      moves = getKnightMoves({ isWhite: pieceType === pieceTypes.WHITE_KNIGHT, from, squares });
      break;
    case pieceTypes.BLACK_BISHOP:
    case pieceTypes.WHITE_BISHOP:
      moves = getBishopMoves({ isWhite: pieceType === pieceTypes.WHITE_BISHOP, from, squares });
      break;
    case pieceTypes.BLACK_QUEEN:
    case pieceTypes.WHITE_QUEEN:
      moves = getQueenMoves({ isWhite: pieceType === pieceTypes.WHITE_QUEEN, from, squares });
      break;
    case pieceTypes.BLACK_KING:
    case pieceTypes.WHITE_KING:
      moves = getLegalKingMoves({ isWhite: pieceType === pieceTypes.WHITE_KING });
      break;
    case pieceTypes.EMPTY_SQUARE:
    default:
      moves = [];
      break;
  }
  return moves;
};

export const isLegalMove = ({ from, to, squares }) => {
  const pieceType = squares[getIdx(from.row, from.col)].piece.type;
  let isLegal;
  switch (pieceType) {
    case pieceTypes.BLACK_PAWN:
    case pieceTypes.WHITE_PAWN:
      isLegal = isLegalPawnMove({ from, to, squares });
      break;
    case pieceTypes.BLACK_ROOK:
    case pieceTypes.WHITE_ROOK:
      isLegal = isLegalRookMove({ from, to, squares });
      break;
    case pieceTypes.BLACK_KNIGHT:
    case pieceTypes.WHITE_KNIGHT:
      isLegal = isLegalKnightMove({ from, to, squares });
      break;
    case pieceTypes.BLACK_BISHOP:
    case pieceTypes.WHITE_BISHOP:
      isLegal = isLegalBishopMove({ from, to, squares });
      break;
    case pieceTypes.BLACK_QUEEN:
    case pieceTypes.WHITE_QUEEN:
      isLegal = isLegalQueenMove({ from, to, squares });
      break;
    case pieceTypes.BLACK_KING:
    case pieceTypes.WHITE_KING:
      isLegal = isLegalPawnMove({ from, to, squares }) && !canEnemyAttack({ isWhite: pieceType === pieceTypes.WHITE_KING, to, squares });
      break;
    case pieceTypes.EMPTY_SQUARE:
    default:
      isLegal = false;
      break;
  }
  return isLegal;
};
