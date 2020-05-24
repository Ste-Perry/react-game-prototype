import { getIdx } from '../rowColToIndexUtility';
import { getSquareNameFromRowCol } from '../squareNameUtility';
import pieceTypes from '../../constants/pieceTypes';
import { decrementer, incrementer, isEmptyIfFriendlyCaptured, isEnemyPiece, maxBound, minBound } from '../movesUtility';

const getBishopMoves = (isWhite, row, col, squares, checkingAttacks = false) => {
  // many possible moves along any diagonal
  const moves = [];

  const checkMoves = (updateRowLocation, updateColLocation, checkRowBound, checkColBound) => {
    let curRow = updateRowLocation(row);
    let curCol = updateColLocation(col);
    while (checkRowBound(curRow) && checkColBound(curCol)) {
      const pieceType = squares[getIdx(curRow, curCol)].piece.type;
      if (
        isEmptyIfFriendlyCaptured(pieceType, isWhite, checkingAttacks) ||
        pieceType === pieceTypes.EMPTY_SQUARE ||
        isEnemyPiece(pieceType, isWhite)
      ) {
        moves.push(getSquareNameFromRowCol(curRow, curCol));
        curRow = updateRowLocation(curRow);
        curCol = updateColLocation(curCol);
        // can't move beyond that enemy piece
        if (pieceType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(pieceType, isWhite)) {
          break;
        }
      } else {
        break; // must be our piece and ignoreFriendlies is false
      }
    }
  };

  checkMoves(decrementer, incrementer, minBound, maxBound); // north east
  checkMoves(incrementer, incrementer, maxBound, maxBound); // south east
  checkMoves(incrementer, decrementer, maxBound, minBound); // south west
  checkMoves(decrementer, decrementer, minBound, minBound); // north west
  return moves;
};

export default getBishopMoves;
