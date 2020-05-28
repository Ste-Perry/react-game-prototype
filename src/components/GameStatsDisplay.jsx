import React from 'react';
import PropTypes from 'prop-types';
import MovesList from './MovesList';

const GameStatsDisplay = ({ gameState, resetGame }) => {
  return (
    <div
      style={{
        display: 'block',
        position: 'absolute',
        fontSize: '32px',
        fontFamily: 'Arial',
        width: 802,
        height: 204,
        borderTop: 'solid 5px #999',
        left: 0,
        top: 802,
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <table style={{ width: '100%', padding: 30 }}>
        <tbody>
          <tr>
            <td>
              <strong>Current Move:</strong>
              &nbsp;
              {gameState.isWhiteMove ? 'white' : 'black'}
            </td>
            <td rowSpan={2}>
              <MovesList />
            </td>
          </tr>
          <tr>
            <td>
              <button
                style={{
                  fontSize: 48,
                  width: 400,
                  height: 70,
                  backgroundColor: 'black',
                  color: 'white',
                }}
                type="button"
                onClick={resetGame}
              >
                Reset Board
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

GameStatsDisplay.propTypes = {
  gameState: PropTypes.shape(),
  resetGame: PropTypes.func,
};
GameStatsDisplay.defaultProps = {
  gameState: {},
  resetGame: undefined,
};

export default GameStatsDisplay;
