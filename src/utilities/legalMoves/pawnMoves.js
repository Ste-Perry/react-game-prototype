import pieceTypes from '@constants/pieceTypes';
import { getRowColFromSquareName, getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import { isEnemyPiece } from '@utilities/movesUtility';
import { getIdx, getIdxFromRowCol } from '@utilities/rowColToIndexUtility';

export const getPawnMoves = ({ isWhite, from, squares, checkingAttacks = false }) => {
  // four possible moves - one forward, two forward,
  // capture left or right (no en passant)
  const moves = [];
  const { row, col } = from;

  const getPawnForwardMoves = () => {
    const forwardRow = isWhite ? row - 1 : row + 1;
    const forwardTwoRow = isWhite ? 4 : 3;
    const startRow = isWhite ? 6 : 1;
    // one square ahead is empty
    if (squares[getIdxFromRowCol(forwardRow, col)].piece.type === pieceTypes.EMPTY_SQUARE) {
      moves.push(getSquareNameFromRowCol(forwardRow, col));
    }
    // two squares ahead empty, but only on first move
    if (
      row === startRow &&
      squares[getIdxFromRowCol(forwardRow, col)].piece.type === pieceTypes.EMPTY_SQUARE &&
      squares[getIdxFromRowCol(forwardTwoRow, col)].piece.type === pieceTypes.EMPTY_SQUARE
    ) {
      moves.push(getSquareNameFromRowCol(forwardTwoRow, col));
    }
  };

  const getPawnAttackMoves = () => {
    const forwardRow = isWhite ? row - 1 : row + 1;
    const forwardLeftCol = col - 1;
    const forwardRightCol = col + 1;
    const forwardLeftType = forwardLeftCol >= 0 ? squares[getIdxFromRowCol(forwardRow, forwardLeftCol)].piece.type : null;
    const forwardRightType = forwardRightCol <= 7 ? squares[getIdxFromRowCol(forwardRow, forwardRightCol)].piece.type : null;
    if (checkingAttacks || (forwardLeftType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(forwardLeftType, isWhite))) {
      moves.push(getSquareNameFromRowCol(forwardRow, forwardLeftCol));
    }
    if (checkingAttacks || (forwardRightType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(forwardRightType, isWhite))) {
      moves.push(getSquareNameFromRowCol(forwardRow, forwardRightCol));
    }
  };

  // forward moves only legal if no attack moves possible
  getPawnAttackMoves();
  if (moves.length === 0 && !checkingAttacks) {
    getPawnForwardMoves();
  }
  return moves;
};

export const isLegalPawnMove = ({ from, to, squares }) => {
  const { row: toRow, col: toCol } = to;
  const pieceType = squares[getIdx(from)].piece.type;

  if (pieceType !== pieceTypes.WHITE_PAWN && pieceType !== pieceTypes.BLACK_PAWN) {
    throw Error(`unexpected piece type ${pieceType} when checking legal pawn moves`);
  }
  const moves = getPawnMoves({ isWhite: pieceType === pieceTypes.WHITE_PAWN, from, squares });
  for (let idx = 0; idx < moves.length; idx += 1) {
    const { row: moveRow, col: moveCol } = getRowColFromSquareName(moves[idx]);
    if (moveRow === toRow && moveCol === toCol) {
      return true;
    }
  }
  return false;
};
