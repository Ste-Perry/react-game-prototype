import { HIGHLIGHT_LEGAL_MOVES, MOVE_PIECE, RESET_HIGHLIGHTS } from '@redux/actionNames';
import { isEnemyPiece } from '@utilities/movesUtility';
import { clearPieceSelected, setPieceSelected, switchPlayer } from '@redux/actions/game-actions';
import { getLegalMoves, isLegalMove } from '@utilities/legalMoves';
import { getRowColFromSquareName } from '@utilities/squareNameUtility';
import { addMove } from '@redux/actions/moves-actions';
import { getIdx } from '@utilities/rowColToIndexUtility';
import pieceTypes from '@constants/pieceTypes';

export const resetHighlights = () => ({ type: RESET_HIGHLIGHTS });

export const highlightLegalMoves = ({ game, squares, pieceType, from }) => dispatch => {
  if (!isEnemyPiece(pieceType, game.isWhiteMove)) {
    dispatch(setPieceSelected(from));
    dispatch({ type: HIGHLIGHT_LEGAL_MOVES, moves: getLegalMoves({ from, squares }) });
  }
};

const movePiece = ({ from, to }) => ({ type: MOVE_PIECE, from, to });

export const movePieceIfLegal = ({ game, squares, to }) => dispatch => {
  const from = getRowColFromSquareName(game.pieceSelected);
  if (isLegalMove({ from, to, squares })) {
    // lets do this!
    dispatch(movePiece({ from, to }));
    dispatch(addMove({ from, to, isWhite: game.isWhiteMove }));
    dispatch(switchPlayer());
  }
  dispatch(clearPieceSelected());
};

export const squareClicked = ({ game, squares, from }) => dispatch => {
  const pieceType = squares[getIdx(from)].piece.type;
  if (game.pieceSelected && (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, game.isWhiteMove))) {
    dispatch(movePieceIfLegal({ game, squares, from }));
    dispatch(resetHighlights());
  } else if (pieceType !== pieceTypes.EMPTY_SQUARE) {
    dispatch(resetHighlights());
    dispatch(highlightLegalMoves({ game, squares, pieceType, from }));
  } else {
    dispatch(resetHighlights());
  }
};
