import React from 'react';
import store from '@redux/store';

const MovesList = () => {
  const { moves } = store.getState();
  return (
    <div className="noselect scrollable moves">
      {moves.map(move => (
        <div>{move}</div>
      ))}
    </div>
  );
};

export default MovesList;
