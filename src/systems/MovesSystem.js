import getLegalMoves from '@utilities/legalMoves';
import store from '@redux/store';
import { addMove } from '@redux/actions/moves-actions';
import { getRowColFromSquareName, getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import { getIdx } from '@utilities/rowColToIndexUtility';
import pieceTypes from '@constants/pieceTypes';
import { isEnemyPiece } from '@utilities/movesUtility';
import { buildDefaultEntities } from '@utilities/entityUtility';
import { resetHighlights } from '@redux/actions/squares-actions';
import { clearPieceSelected, setPieceSelected, switchPlayer } from '@redux/actions/game-actions';

const MovesSystem = (entities, { input }) => {
  const { game, squares } = store.getState();
  const result = game.gameWasReset ? buildDefaultEntities(game, squares) : { ...entities };

  const offset = 0;
  const xMax = 800;
  const yMax = 800;
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};

  const getSquareSelected = () => {
    const zoneSize = 100;
    const col = Math.floor(payload.pageX / zoneSize);
    const row = Math.floor(payload.pageY / zoneSize);
    console.log(`clicked on square ${getSquareNameFromRowCol(row, col)}`);
    return { row, col };
  };

  const movePieceIfLegal = (row, col) => {
    const { row: pieceRow, col: pieceCol } = getRowColFromSquareName(game.pieceSelected);
    const pieceType = squares[getIdx(pieceRow, pieceCol)].piece.type;
    const moves = getLegalMoves(pieceRow, pieceCol, squares);
    for (let idx = 0; idx < moves.length; idx += 1) {
      const { row: moveRow, col: moveCol } = getRowColFromSquareName(moves[idx]);
      if (moveRow === row && moveCol === col) {
        // lets do this!
        squares[getIdx(row, col)].piece.type = pieceType;
        squares[getIdx(pieceRow, pieceCol)].piece.type = pieceTypes.EMPTY_SQUARE;
        store.dispatch(addMove(getSquareNameFromRowCol(pieceRow, pieceCol), getSquareNameFromRowCol(row, col), game.isWhiteMove));
        store.dispatch(switchPlayer());
        break;
      }
    }
    store.dispatch(clearPieceSelected());
  };

  const highlightLegalMoves = (pieceType, row, col) => {
    if (!isEnemyPiece(pieceType, game.isWhiteMove)) {
      squares[getIdx(row, col)].highlightedPieceToMove = true;
      store.dispatch(setPieceSelected(getSquareNameFromRowCol(row, col)));
      const moves = getLegalMoves(row, col, squares);
      moves.forEach(move => {
        const { row: moveRow, col: moveCol } = getRowColFromSquareName(move);
        squares[getIdx(moveRow, moveCol)].highlightedSquareToMoveTo = true;
      });
    }
  };

  if (payload && payload.pageX >= offset && payload.pageX <= xMax && payload.pageY >= offset && payload.pageY <= yMax) {
    const { row, col } = getSquareSelected();
    const pieceType = squares[getIdx(row, col)].piece.type;
    if (game.pieceSelected && (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, game.isWhiteMove))) {
      movePieceIfLegal(row, col);
      store.dispatch(resetHighlights(squares));
    } else if (pieceType !== pieceTypes.EMPTY_SQUARE) {
      store.dispatch(resetHighlights(squares));
      highlightLegalMoves(pieceType, row, col);
    } else {
      store.dispatch(resetHighlights(squares));
    }
  }
  return result;
};

export default MovesSystem;
