import { buildSquares } from '@utilities/squareUtility';
import { getRowColFromSquareName } from '@utilities/squareNameUtility';
import { HIGHLIGHT_LEGAL_MOVES, PIECE_SELECTED, RESET_GAME, RESET_HIGHLIGHTS, MOVE_PIECE } from '@redux/actionNames';
import { getIdx } from '@utilities/rowColToIndexUtility';
import pieceTypes from '@constants/pieceTypes';

const initialSquares = [...buildSquares()];

const resetHighlights = squares => {
  const result = [...squares];
  for (let idx = 0; idx < squares.length; idx += 1) {
    result[idx].highlightedSquareToMoveTo = false;
    result[idx].highlightedPieceToMove = false;
  }
  return result;
};

const highlightPieceToMove = (squares, index) => {
  const result = [...squares];
  result[index].highlightedPieceToMove = true;
  return result;
};

const highlightLegalMoves = (squares, moves) => {
  const result = [...squares];
  moves.forEach(move => {
    const { row: moveRow, col: moveCol } = getRowColFromSquareName(move);
    result[getIdx(moveRow, moveCol)].highlightedSquareToMoveTo = true;
  });
  return result;
};

const movePiece = (squares, from, to) => {
  const result = [...squares];
  const fromIdx = getIdx(from.row, from.col);
  const toIdx = getIdx(to.row, to.col);
  const pieceType = result[fromIdx].piece.type;
  result[fromIdx].piece.type = pieceTypes.EMPTY_SQUARE;
  result[toIdx].piece.type = pieceType;
  return result;
};

const squaresReducer = (squares = initialSquares, action) => {
  switch (action.type) {
    case RESET_GAME:
      return buildSquares();
    case RESET_HIGHLIGHTS:
      return resetHighlights(squares);
    case PIECE_SELECTED:
      return highlightPieceToMove(squares, getIdx(action.row, action.col));
    case HIGHLIGHT_LEGAL_MOVES:
      return highlightLegalMoves(squares, action.moves);
    case MOVE_PIECE:
      return movePiece(squares, action.from, action.to);
    default:
      return squares;
  }
};

export default squaresReducer;
