import piece from './piece';

const square = (row, col, pieceType) => ({
  row,
  col,
  piece: pieceType != null ? piece(pieceType, row, col) : null,
  highlightedPieceToMove: false,
  highlightedSquareToMoveTo: false,
});

export default square;
