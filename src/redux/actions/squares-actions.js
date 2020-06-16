import { HIGHLIGHT_LEGAL_MOVES, MOVE_PIECE, RESET_HIGHLIGHTS } from '@redux/actionNames';
import { isEnemyPiece } from '@utilities/movesUtility';
import { clearMoveSelectedStartSquareName, setMoveSelectedStartSquareName, switchPlayer } from '@redux/actions/game-actions';
import { getLegalMoves, isLegalMove } from '@utilities/legalMoves';
import { getRowColFromSquareName } from '@utilities/squareNameUtility';
import { addMove } from '@redux/actions/moves-actions';
import { getIdx } from '@utilities/rowColToIndexUtility';
import pieceTypes from '@constants/pieceTypes';

export const resetHighlights = () => ({ type: RESET_HIGHLIGHTS });

export const highlightLegalMoves = ({ game, squares, pieceType, clickLocation }) => dispatch => {
  if (!isEnemyPiece(pieceType, game.isWhiteMove)) {
    dispatch(setMoveSelectedStartSquareName(clickLocation));
    dispatch({ type: HIGHLIGHT_LEGAL_MOVES, moves: getLegalMoves({ from: clickLocation, squares }) });
  }
};

const movePiece = ({ from, to }) => ({ type: MOVE_PIECE, from, to });

export const movePieceIfLegal = ({ game, squares, from, to }) => dispatch => {
  if (isLegalMove({ from, to, squares })) {
    // lets do this!
    dispatch(movePiece({ from, to }));
    dispatch(addMove({ from, to, isWhite: game.isWhiteMove }));
    dispatch(switchPlayer());
  }
  dispatch(clearMoveSelectedStartSquareName());
};

export const squareClicked = ({ game, squares, clickLocation }) => dispatch => {
  const pieceType = squares[getIdx(clickLocation)].piece.type;
  if (game.moveSelectedStartSquareName && (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, game.isWhiteMove))) {
    const from = getRowColFromSquareName(game.moveSelectedStartSquareName);
    dispatch(movePieceIfLegal({ game, squares, from, to: clickLocation }));
    dispatch(resetHighlights());
  } else if (pieceType !== pieceTypes.EMPTY_SQUARE) {
    dispatch(resetHighlights());
    dispatch(highlightLegalMoves({ game, squares, pieceType, clickLocation }));
  } else {
    dispatch(resetHighlights());
  }
};
