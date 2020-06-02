import { ADD_MOVE } from '../actionNames';

export const addMove = ({ from, to, isWhite }) => ({
  type: ADD_MOVE,
  from,
  to,
  isWhite,
});
