import pieceTypes from '../../constants/pieceTypes';
import { getSquareNameFromRowCol } from '../squareNameUtility';
import { isEnemyPiece } from '../movesUtility';
import { getIdx } from '../rowColToIndexUtility';

const getPawnMoves = (isWhite, row, col, squares) => {
  // four possible moves - one forward, two forward,
  // capture left or right (no en passant)
  const moves = [];

  const getPawnForwardMoves = () => {
    const forwardRow = isWhite ? row - 1 : row + 1;
    const forwardTwoRow = isWhite ? 4 : 3;
    const startRow = isWhite ? 6 : 1;
    // one square ahead is empty
    if (squares[getIdx(forwardRow, col)].piece.type === pieceTypes.EMPTY_SQUARE) {
      moves.push(getSquareNameFromRowCol(forwardRow, col));
    }
    // two squares ahead empty, but only on first move
    if (row === startRow && squares[getIdx(forwardTwoRow, col)].piece.type === pieceTypes.EMPTY_SQUARE) {
      moves.push(getSquareNameFromRowCol(forwardTwoRow, col));
    }
  };

  const getPawnAttackMoves = () => {
    const forwardRow = isWhite ? row - 1 : row + 1;
    const forwardLeftCol = col - 1;
    const forwardRightCol = col + 1;
    const forwardLeftType = forwardLeftCol >= 0 ? squares[getIdx(forwardRow, forwardLeftCol)].piece.type : null;
    const forwardRightType = forwardRightCol <= 7 ? squares[getIdx(forwardRow, forwardRightCol)].piece.type : null;
    if (forwardLeftType !== null && forwardLeftType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(forwardLeftType, isWhite)) {
      moves.push(getSquareNameFromRowCol(forwardRow, forwardLeftCol));
    }
    if (forwardRightType !== null && forwardRightType !== pieceTypes.EMPTY_SQUARE && isEnemyPiece(forwardRightType, isWhite)) {
      moves.push(getSquareNameFromRowCol(forwardRow, forwardLeftCol));
    }
  };

  // forward moves only legal if no attack moves possible
  getPawnAttackMoves();
  if (moves.length === 0) {
    getPawnForwardMoves();
  }
  return moves;
};

export default getPawnMoves;
