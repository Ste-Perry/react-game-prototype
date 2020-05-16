import pt from '../constants/pieceTypes';
import square from '../models/square';

const defaultBoardSetup = [
  pt.BR,
  pt.BN,
  pt.BB,
  pt.BQ,
  pt.BK,
  pt.BB,
  pt.BN,
  pt.BR,
  pt.BP,
  pt.BP,
  pt.BP,
  pt.BP,
  pt.BP,
  pt.BP,
  pt.BP,
  pt.BP,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.ES,
  pt.WP,
  pt.WP,
  pt.WP,
  pt.WP,
  pt.WP,
  pt.WP,
  pt.WP,
  pt.WP,
  pt.WR,
  pt.WN,
  pt.WB,
  pt.WQ,
  pt.WK,
  pt.WB,
  pt.WN,
  pt.WR,
];

const expectedPieceCounts = {
  [pt.BP]: 8,
  [pt.BR]: 2,
  [pt.BN]: 2,
  [pt.BB]: 2,
  [pt.BQ]: 1,
  [pt.BK]: 1,
  [pt.WP]: 8,
  [pt.WR]: 2,
  [pt.WN]: 2,
  [pt.WB]: 2,
  [pt.WQ]: 1,
  [pt.WK]: 1,
  [pt.ES]: 32,
};

const validateBoardSetup = setup => {
  const counts = {};
  Object.keys(pt).forEach(type => {
    counts[type] = 0;
  });
  if (!Array.isArray(setup)) {
    throw Error('setup is not an array!');
  }
  if (setup.length !== 64) {
    throw Error('setup not an array of 64 elements!');
  }
  setup.forEach(type => {
    counts[type] += 1;
  });

  Object.keys(counts).forEach(type => {
    const expectedCount = expectedPieceCounts[type];
    const actualCount = counts[type];
    if (expectedCount !== actualCount) {
      throw Error(
        `incorrect number of ${type} - expected: ${expectedCount} actual: ${actualCount}`
      );
    }
  });
};

const squareFactory = (initialSetup = defaultBoardSetup) => {
  validateBoardSetup(initialSetup);
  const squares = [];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const index = col + row * 8;
      squares.push(square(row, col, initialSetup[index]));
    }
  }
  return squares;
};

export default squareFactory;
