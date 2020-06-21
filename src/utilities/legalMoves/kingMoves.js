import { getIdx, getIdxFromRowCol } from '@utilities/rowColToIndexUtility';
import { isEmptyIfFriendlyCaptured, isEnemyPiece, maxBound, minBound, minMaxBound } from '@utilities/movesUtility';
import { getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import pieceTypes from '@constants/pieceTypes';

const checkMove = ({ isWhite, checkRow, checkCol, checkRowBound, checkColBound, squares, checkingAttacks = false }) => {
  if (checkRowBound(checkRow) && checkColBound(checkCol)) {
    const pieceType = squares[getIdxFromRowCol(checkRow, checkCol)].piece.type;
    if (
      isEmptyIfFriendlyCaptured({ pieceType, isWhite, checkingAttacks, kingAttack: true }) ||
      pieceType === pieceTypes.EMPTY_SQUARE ||
      isEnemyPiece(pieceType, isWhite)
    ) {
      return true;
    }
    console.log(`can't move to row ${checkRow}, col ${checkCol} - square is friendly piece of type ${pieceType}`);
    return false;
  }
  return false;
};

export const getKingMoves = ({ isWhite, from, squares, checkingAttacks = false }) => {
  const { row, col } = from;
  const moves = [];

  const checkMoveAndPush = (checkRow, checkCol, checkRowBound, checkColBound) => {
    if (checkMove({ isWhite, checkRow, checkCol, checkRowBound, checkColBound, squares, checkingAttacks })) {
      moves.push(getSquareNameFromRowCol(checkRow, checkCol));
    }
  };

  checkMoveAndPush(row - 1, col + 1, minBound, maxBound); // north east
  checkMoveAndPush(row, col + 1, () => true, maxBound); // east
  checkMoveAndPush(row + 1, col + 1, maxBound, maxBound); // south east
  checkMoveAndPush(row + 1, col, maxBound, () => true); // south
  checkMoveAndPush(row + 1, col - 1, maxBound, minBound); // south west
  checkMoveAndPush(row, col - 1, () => true, minBound); // west
  checkMoveAndPush(row - 1, col - 1, minBound, minBound); // north west
  checkMoveAndPush(row - 1, col, minBound, () => true); // north
  return moves;
};

export const isLegalKingMove = ({ from, to, squares, checkingAttacks = false }) => {
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;
  const pieceType = squares[getIdx(from)].piece.type;

  if (pieceType !== pieceTypes.WHITE_KING && pieceType !== pieceTypes.BLACK_KING) {
    throw Error(`unexpected piece type ${pieceType} when checking legal king moves`);
  }

  if (Math.abs(fromRow - toRow) > 1 || Math.abs(fromCol - toCol) > 1) {
    return false;
  }
  return checkMove({
    isWhite: pieceType === pieceTypes.WHITE_KING,
    checkRow: toRow,
    checkCol: toCol,
    checkRowBound: minMaxBound,
    checkColBound: minMaxBound,
    squares,
    checkingAttacks,
  });
};
