import getLegalMoves from '@utilities/legalMoves';
import store from '@redux/store';
import { addMove, resetMoves } from '@redux/actions/moves-actions';
import { getRowColFromSquareName, getSquareNameFromRowCol } from '../utilities/squareNameUtility';
import { getIdx } from '../utilities/rowColToIndexUtility';
import pieceTypes from '../constants/pieceTypes';
import { isEnemyPiece } from '../utilities/movesUtility';
import setupGame from '../utilities/gameUtility';

const MovesSystem = (entities, { input }) => {
  let result = {
    ...entities,
  };

  const offset = 0;
  const xMax = 800;
  const yMax = 800;
  const { squares, gameState } = entities;
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};

  const getSquareSelected = () => {
    const zoneSize = 100;
    const col = Math.floor(payload.pageX / zoneSize);
    const row = Math.floor(payload.pageY / zoneSize);
    console.log(`clicked on square ${getSquareNameFromRowCol(row, col)}`);
    return { row, col };
  };

  const resetHighlights = () => {
    for (let idx = 0; idx < result.squares.length; idx += 1) {
      result.squares[idx].highlightedSquareToMoveTo = false;
      result.squares[idx].highlightedPieceToMove = false;
    }
  };

  const movePieceIfLegal = (row, col) => {
    const { row: pieceRow, col: pieceCol } = getRowColFromSquareName(gameState.pieceSelected);
    const pieceType = squares[getIdx(pieceRow, pieceCol)].piece.type;
    const moves = getLegalMoves(pieceRow, pieceCol, squares);
    for (let idx = 0; idx < moves.length; idx += 1) {
      const { row: moveRow, col: moveCol } = getRowColFromSquareName(moves[idx]);
      if (moveRow === row && moveCol === col) {
        // lets do this!
        result.squares[getIdx(row, col)].piece.type = pieceType;
        result.squares[getIdx(pieceRow, pieceCol)].piece.type = pieceTypes.EMPTY_SQUARE;
        store.dispatch(addMove(getSquareNameFromRowCol(pieceRow, pieceCol), getSquareNameFromRowCol(row, col), result.gameState.isWhiteMove));
        result.gameState.isWhiteMove = !result.gameState.isWhiteMove;
        break;
      }
    }
    result.gameState.pieceSelected = null;
  };

  const highlightLegalMoves = (pieceType, row, col) => {
    if (!isEnemyPiece(pieceType, gameState.isWhiteMove)) {
      squares[getIdx(row, col)].highlightedPieceToMove = true;
      gameState.pieceSelected = getSquareNameFromRowCol(row, col);
      const moves = getLegalMoves(row, col, squares);
      moves.forEach(move => {
        const { row: moveRow, col: moveCol } = getRowColFromSquareName(move);
        squares[getIdx(moveRow, moveCol)].highlightedSquareToMoveTo = true;
      });
    }
  };

  if (result.gameState.reset) {
    result = setupGame({});
    store.dispatch(resetMoves());
  } else if (payload && payload.pageX >= offset && payload.pageX <= xMax && payload.pageY >= offset && payload.pageY <= yMax) {
    const { row, col } = getSquareSelected();
    const pieceType = squares[getIdx(row, col)].piece.type;
    if (gameState.pieceSelected && (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, result.gameState.isWhiteMove))) {
      movePieceIfLegal(row, col);
      resetHighlights();
    } else if (pieceType !== pieceTypes.EMPTY_SQUARE) {
      resetHighlights();
      highlightLegalMoves(pieceType, row, col);
    } else {
      resetHighlights();
    }
  }
  return result;
};

export default MovesSystem;
