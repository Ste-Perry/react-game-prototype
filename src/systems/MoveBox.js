import getSquareNameFromRowCol from '../utillities/squareUtils';

const MoveBox = (entities, { input }) => {
  const offset = 0;
  const xMax = 800;
  const yMax = 800;
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};
  if (
    payload &&
    payload.pageX >= offset &&
    payload.pageX <= xMax &&
    payload.pageY >= offset &&
    payload.pageY <= yMax
  ) {
    const zoneSize = 100;
    const col = Math.floor(payload.pageX / zoneSize);
    const row = Math.floor(payload.pageY / zoneSize);
    console.log(
      `clicked on square ${getSquareNameFromRowCol(row, col)}`
    );

    return entities;
  }
  return entities;
};

export default MoveBox;
