export const getIdx = (row, col) => row * 8 + col;

export const getRowCol = index => ({
  row: Math.floor(index / 8),
  col: index % 8,
});
