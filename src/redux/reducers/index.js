import { combineReducers } from 'redux';
import gameReducer from '@redux/reducers/game-reducer';
import movesReducer from '@redux/reducers/moves-reducer';
import squaresReducer from '@redux/reducers/squares-reducer';

const rootReducer = () =>
  combineReducers({
    moves: movesReducer,
    squares: squaresReducer,
    game: gameReducer,
  });

export default rootReducer;
