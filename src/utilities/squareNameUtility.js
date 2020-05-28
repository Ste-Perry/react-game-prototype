const colMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
};

const rowMap = {
  0: '8',
  1: '7',
  2: '6',
  3: '5',
  4: '4',
  5: '3',
  6: '2',
  7: '1',
};

const reverseColMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

const reverseRowMap = {
  '8': 0,
  '7': 1,
  '6': 2,
  '5': 3,
  '4': 4,
  '3': 5,
  '2': 6,
  '1': 7,
};

export const getRowColFromSquareName = name => ({
  row: reverseRowMap[name.substr(1, 1)],
  col: reverseColMap[name.substr(0, 1)],
});

export const getSquareNameFromRowCol = (row, col) => `${colMap[col]}${rowMap[row]}`;
