import piece from './piece';

const square = (row, col, pieceType) => ({
  row,
  col,
  piece: pieceType != null ? piece(pieceType, row, col) : null,
});

export default square;
