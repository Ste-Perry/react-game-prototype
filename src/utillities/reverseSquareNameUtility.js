const colMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

const rowMap = {
  '8': 0,
  '7': 1,
  '6': 2,
  '5': 3,
  '4': 4,
  '3': 5,
  '2': 6,
  '1': 7,
};

const getRowColFromSquareName = name => [rowMap[name.substr(1, 1)], colMap[name.substr(0, 1)]];

export default getRowColFromSquareName;
