const piece = (pieceType, row, col) => ({
  type: pieceType,
  location: {
    row,
    col,
  },
});

export default piece;
