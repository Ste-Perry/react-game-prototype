import React from 'react';
import store from '@redux/store';

const MovesList = () => {
  const { movesList } = store.getState().moves;
  return (
    <div className="noselect scrollable moves">
      {movesList.map(move => (
        <div>{move}</div>
      ))}
    </div>
  );
};

export default MovesList;
