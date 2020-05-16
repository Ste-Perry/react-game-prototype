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

const getSquareNameFromRowCol = (row, col) =>
  `${colMap[col]}${rowMap[row]}`;

export default getSquareNameFromRowCol;
