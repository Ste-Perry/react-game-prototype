import { HIGHLIGHT_LEGAL_MOVES, MOVE_PIECE, RESET_HIGHLIGHTS } from '@redux/actionNames';
import { isEnemyPiece } from '@utilities/movesUtility';
import { clearPieceSelected, setPieceSelected, switchPlayer } from '@redux/actions/game-actions';
import getLegalMoves from '@utilities/legalMoves';
import { getRowColFromSquareName } from '@utilities/squareNameUtility';
import { addMove } from '@redux/actions/moves-actions';
import { getIdx } from '@utilities/rowColToIndexUtility';
import pieceTypes from '@constants/pieceTypes';

export const resetHighlights = () => ({ type: RESET_HIGHLIGHTS });

export const highlightLegalMoves = ({ game, squares, pieceType, row, col }) => dispatch => {
  if (!isEnemyPiece(pieceType, game.isWhiteMove)) {
    dispatch(setPieceSelected(row, col));
    dispatch({ type: HIGHLIGHT_LEGAL_MOVES, moves: getLegalMoves(row, col, squares) });
  }
};

const movePiece = ({ from, to }) => ({ type: MOVE_PIECE, from, to });

export const movePieceIfLegal = ({ game, squares, row, col }) => dispatch => {
  const { row: pieceRow, col: pieceCol } = getRowColFromSquareName(game.pieceSelected);
  const moves = getLegalMoves(pieceRow, pieceCol, squares);
  for (let idx = 0; idx < moves.length; idx += 1) {
    const { row: moveRow, col: moveCol } = getRowColFromSquareName(moves[idx]);
    if (moveRow === row && moveCol === col) {
      // lets do this!
      const from = { row: pieceRow, col: pieceCol };
      const to = { row, col };
      dispatch(movePiece({ from, to }));
      dispatch(addMove({ from, to, isWhite: game.isWhiteMove }));
      dispatch(switchPlayer());
      break;
    }
  }
  dispatch(clearPieceSelected());
};

export const squareClicked = ({ game, squares, row, col }) => dispatch => {
  const pieceType = squares[getIdx(row, col)].piece.type;
  if (game.pieceSelected && (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, game.isWhiteMove))) {
    dispatch(movePieceIfLegal({ game, squares, row, col }));
    dispatch(resetHighlights());
  } else if (pieceType !== pieceTypes.EMPTY_SQUARE) {
    dispatch(resetHighlights());
    dispatch(highlightLegalMoves({ game, squares, pieceType, row, col }));
  } else {
    dispatch(resetHighlights());
  }
};
