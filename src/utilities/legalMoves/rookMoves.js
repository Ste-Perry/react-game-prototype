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
} from '../movesUtility';
import pieceTypes from '../../constants/pieceTypes';
import { getIdxFromRowCol } from '../rowColToIndexUtility';

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
  const pieceType = squares[getIdxFromRowCol(fromRow, fromCol)].piece.type;

  if (pieceType !== pieceTypes.WHITE_ROOK || pieceType !== pieceTypes.BLACK_ROOK) {
    throw Error(`unexpected piece type ${pieceType} when checking legal rook moves`);
  }

  if (fromRow === toRow || fromCol === toCol) {
    return checkMove({
      isWhite: pieceType === pieceTypes.WHITE_ROOK,
      pieceType: squares[getIdxFromRowCol(toRow, toCol)].piece.type,
    });
  }
  return false;
};
