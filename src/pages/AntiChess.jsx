import React from 'react';
import 'regenerator-runtime/runtime';
import { GameEngine } from 'react-game-engine';
import { useSelector } from 'react-redux';
import { buildDefaultEntities } from '@utilities/entityUtility';
import MovesSystem from '@systems/MovesSystem';

const AntiChess = () => {
  const { squares, game } = useSelector(state => ({
    squares: state.squares,
    game: state.game,
  }));

  return (
    <GameEngine
      style={{
        border: 'solid 5px #999',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 802,
        height: 1010,
      }}
      systems={[MovesSystem]}
      entities={buildDefaultEntities(game, squares)}
    />
  );
};

export default AntiChess;
