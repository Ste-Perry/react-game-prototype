import getSquareNameFromRowCol from '../utillities/squareNameUtility';
import getLegalMoves from '../utillities/legalMoves';
import getRowColFromSquareName from '../utillities/reverseSquareNameUtility';
import getIdx from '../utillities/rowColToIndexUtility';

const MoveBox = (entities, { input }) => {
  const offset = 0;
  const xMax = 800;
  const yMax = 800;
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};

  const highlightLegalMoves = () => {
    const result = {
      ...entities,
    };
    const zoneSize = 100;
    const col = Math.floor(payload.pageX / zoneSize);
    const row = Math.floor(payload.pageY / zoneSize);
    console.log(`clicked on square ${getSquareNameFromRowCol(row, col)}`);
    for (let idx = 0; idx < result.squares.length; idx += 1) {
      result.squares[idx].highlighted = false;
    }
    const moves = getLegalMoves(row, col, entities.squares);
    moves.forEach(move => {
      const [moveRow, moveCol] = getRowColFromSquareName(move);
      result.squares[getIdx(moveRow, moveCol)].highlighted = true;
    });
    return result;
  };

  if (payload && payload.pageX >= offset && payload.pageX <= xMax && payload.pageY >= offset && payload.pageY <= yMax) {
    return highlightLegalMoves();
  }
  return entities;
};

export default MoveBox;
