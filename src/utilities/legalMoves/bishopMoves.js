import { getIdxFromRowCol } from '../rowColToIndexUtility';
import { getSquareNameFromRowCol } from '../squareNameUtility';
import pieceTypes from '../../constants/pieceTypes';
import { decrementer, incrementer, isEmptyIfFriendlyCaptured, isEnemyPiece, maxBound, minBound } from '../movesUtility';

const checkMove = ({ isWhite, pieceType, checkingAttacks = false }) => {
  return !!(
    isEmptyIfFriendlyCaptured(pieceType, isWhite, checkingAttacks) ||
    pieceType === pieceTypes.EMPTY_SQUARE ||
    isEnemyPiece(pieceType, isWhite)
  );
};

export const getBishopMoves = ({ isWhite, from, squares, checkingAttacks = false }) => {
  // many possible moves along any diagonal
  const moves = [];
  const { row, col } = from;

  const checkMoves = (updateRowLocation, updateColLocation, checkRowBound, checkColBound) => {
    let curRow = updateRowLocation(row);
    let curCol = updateColLocation(col);
    while (checkRowBound(curRow) && checkColBound(curCol)) {
      const pieceType = squares[getIdxFromRowCol(row, col)].piece.type;
      if (checkMove({ isWhite, pieceType, checkingAttacks })) {
        moves.push(getSquareNameFromRowCol(curRow, curCol));
        curRow = updateRowLocation(curRow);
        curCol = updateColLocation(curCol);
        // can't move beyond that enemy piece
        if (pieceType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(pieceType, isWhite)) {
          break;
        }
      } else {
        break; // can't move beyond this point
      }
    }
  };

  checkMoves(decrementer, incrementer, minBound, maxBound); // north east
  checkMoves(incrementer, incrementer, maxBound, maxBound); // south east
  checkMoves(incrementer, decrementer, maxBound, minBound); // south west
  checkMoves(decrementer, decrementer, minBound, minBound); // north west
  return moves;
};

export const isLegalBishopMove = ({ from, to, squares }) => {
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;
  const pieceType = squares[getIdxFromRowCol(fromRow, fromCol)].piece.type;

  if (pieceType !== pieceTypes.WHITE_BISHOP || pieceType !== pieceTypes.BLACK_BISHOP) {
    throw Error(`unexpected piece type ${pieceType} when checking legal bishop moves`);
  }

  if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
    return checkMove({
      isWhite: pieceType === pieceTypes.WHITE_BISHOP,
      pieceType: squares[getIdxFromRowCol(toRow, toCol)].piece.type,
    });
  }
  return false;
};
