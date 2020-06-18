import { getIdx } from '@utilities/rowColToIndexUtility';
import {
  isEnemyPiece,
  addMoveFromCurCol,
  addMoveFromCurRow,
  decrementer,
  getFromCurCol,
  getFromCurRow,
  incrementer,
  maxBound,
  minBound,
  isEmptyIfFriendlyCaptured,
  checkMovesBetween,
} from '@utilities/movesUtility';
import pieceTypes from '@constants/pieceTypes';

const checkMove = ({ isWhite, pieceType, checkingAttacks = false }) => {
  return isEmptyIfFriendlyCaptured(pieceType, isWhite, checkingAttacks) || pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, isWhite);
};

export const getRookMoves = ({ isWhite, from, squares, checkingAttacks = false }) => {
  // many possible moves along any col or row
  const moves = [];
  const { row, col } = from;

  const checkMoves = (location, updateLocation, checkBound, getPieceIndex, addMove) => {
    let curLoc = updateLocation(location);
    while (checkBound(curLoc)) {
      const pieceType = squares[getPieceIndex(curLoc)].piece.type;
      if (checkMove({ isWhite, pieceType, checkingAttacks })) {
        addMove(curLoc);
        curLoc = updateLocation(curLoc);
        // can't move beyond the enemy piece
        if (pieceType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(pieceType, isWhite)) {
          break;
        }
      } else {
        break; // must be our piece
      }
    }
  };

  checkMoves(row, decrementer, minBound, getFromCurRow(col), addMoveFromCurRow(moves, col));
  checkMoves(row, incrementer, maxBound, getFromCurRow(col), addMoveFromCurRow(moves, col));
  checkMoves(col, decrementer, minBound, getFromCurCol(row), addMoveFromCurCol(moves, row));
  checkMoves(col, incrementer, maxBound, getFromCurCol(row), addMoveFromCurCol(moves, row));
  return moves;
};

export const isLegalRookMove = ({ from, to, squares }) => {
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;
  const pieceType = squares[getIdx(from)].piece.type;

  if (
    pieceType !== pieceTypes.WHITE_ROOK &&
    pieceType !== pieceTypes.BLACK_ROOK &&
    pieceType !== pieceTypes.WHITE_QUEEN &&
    pieceType !== pieceTypes.BLACK_QUEEN
  ) {
    throw Error(`unexpected piece type ${pieceType} when checking legal rook moves`);
  }

  if (fromRow === toRow || fromCol === toCol) {
    const isWhite = pieceType === pieceTypes.WHITE_QUEEN || pieceType === pieceTypes.WHITE_ROOK;
    return checkMovesBetween({ checkMove, isWhite, from, to, squares });
  }
  return false;
};
