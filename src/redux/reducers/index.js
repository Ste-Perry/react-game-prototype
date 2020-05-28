import { combineReducers } from 'redux';
import movesReducer from './moves-reducer';

const rootReducer = () =>
  combineReducers({
    moves: movesReducer,
  });

export default rootReducer;
