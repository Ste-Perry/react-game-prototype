export const getIdxFromRowCol = (row, col) => row * 8 + col;

export const getIdx = from => {
  const { row, col } = from;
  return getIdxFromRowCol(row, col);
};

export const getRowCol = index => ({
  row: Math.floor(index / 8),
  col: index % 8,
});
