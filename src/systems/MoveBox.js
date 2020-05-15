import React from 'react';
import Box from '../components/Box';

const MoveBox = (entities, { input }) => {
  const offset = 8;
  const xMax = entities.board.width + offset;
  const yMax = entities.board.height + offset;
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};
  if (
    payload &&
    payload.pageX >= offset &&
    payload.pageX <= xMax &&
    payload.pageY >= offset &&
    payload.pageY <= yMax
  ) {
    const zoneSize = 100;
    const xZone = Math.floor(payload.pageX / zoneSize);
    const yZone = Math.floor(payload.pageY / zoneSize);
    const newX = xZone * zoneSize + zoneSize / 2 + offset;
    const newY = yZone * zoneSize + zoneSize / 2 + offset;

    return {
      board: entities.board,
      box1: {
        x: newX,
        y: newY,
        renderer: <Box />,
      },
    };
  }
  return entities;
};

export default MoveBox;
