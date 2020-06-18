import pt from '@constants/pieceTypes';
import square from '@models/square';
import { getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import { getIdx, getIdxFromRowCol } from '@utilities/rowColToIndexUtility';

const defaultBoardSetup = [
  pt.BLACK_ROOK,
  pt.BLACK_KNIGHT,
  pt.BLACK_BISHOP,
  pt.BLACK_QUEEN,
  pt.BLACK_KING,
  pt.BLACK_BISHOP,
  pt.BLACK_KNIGHT,
  pt.BLACK_ROOK,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.BLACK_PAWN,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.EMPTY_SQUARE,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_PAWN,
  pt.WHITE_ROOK,
  pt.WHITE_KNIGHT,
  pt.WHITE_BISHOP,
  pt.WHITE_QUEEN,
  pt.WHITE_KING,
  pt.WHITE_BISHOP,
  pt.WHITE_KNIGHT,
  pt.WHITE_ROOK,
];

const expectedPieceCounts = {
  [pt.BLACK_PAWN]: 8,
  [pt.BLACK_ROOK]: 2,
  [pt.BLACK_KNIGHT]: 2,
  [pt.BLACK_BISHOP]: 2,
  [pt.BLACK_QUEEN]: 1,
  [pt.BLACK_KING]: 1,
  [pt.WHITE_PAWN]: 8,
  [pt.WHITE_ROOK]: 2,
  [pt.WHITE_KNIGHT]: 2,
  [pt.WHITE_BISHOP]: 2,
  [pt.WHITE_QUEEN]: 1,
  [pt.WHITE_KING]: 1,
  [pt.EMPTY_SQUARE]: 32,
};

const validateBoardSetup = setup => {
  const counts = {};
  Object.keys(pt).forEach(type => {
    const pieceType = pt[type];
    counts[pieceType] = 0;
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
      throw Error(`incorrect number of ${type} - expected: ${expectedCount} actual: ${actualCount}`);
    }
  });
};

export const buildSquares = (initialSetup = defaultBoardSetup) => {
  validateBoardSetup(initialSetup);
  const squares = [];
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      squares.push(square(row, col, initialSetup[getIdxFromRowCol(row, col)]));
    }
  }
  return squares;
};

export const getSquareSelected = location => {
  const zoneSize = 100;
  const col = Math.floor(location.pageX / zoneSize);
  const row = Math.floor(location.pageY / zoneSize);
  console.log(`clicked on square ${getSquareNameFromRowCol(row, col)}`);
  return { row, col };
};

const inBoundsX = ({ location, offset, xMax }) => location.pageX >= offset && location.pageX <= xMax;
const inBoundsY = ({ location, offset, yMax }) => location.pageY >= offset && location.pageY <= yMax;

const getStep = (from, to) => {
  if (from < to) {
    return 1;
  }
  if (from > to) {
    return -1;
  }
  return 0;
};

export const inBounds = ({ location, offset, xMax, yMax }) =>
  location && inBoundsX({ location, offset, xMax }) && inBoundsY({ location, offset, yMax });

export const getAllMoveSquares = ({ from, to, squares }) => {
  const result = [];
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;
  const stepRow = getStep(fromRow, toRow);
  const stepCol = getStep(fromCol, toCol);
  for (let curRow = fromRow + stepRow, curCol = fromCol + stepCol; curRow !== toRow || curCol !== toCol; curRow += stepRow, curCol += stepCol) {
    result.push(squares[getIdxFromRowCol(curRow, curCol)]);
  }
  result.push(squares[getIdx(to)]);
  return result;
};
