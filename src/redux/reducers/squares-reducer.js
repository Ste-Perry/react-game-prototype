import { buildSquares } from '@utilities/squareUtility';
import { RESET_GAME, RESET_HIGHLIGHTS } from '../actionNames';

const initialState = [...buildSquares()];

const squaresReducer = (state = initialState, action) => {
  const { squares } = action;
  switch (action.type) {
    case RESET_GAME:
      return buildSquares();
    case RESET_HIGHLIGHTS:
      return squares;
    default:
      return state;
  }
};

export default squaresReducer;
