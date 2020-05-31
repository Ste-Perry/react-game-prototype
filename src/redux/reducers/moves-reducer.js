import { ADD_MOVE, RESET_GAME } from '../actionNames';

const initialState = {
  movesList: [],
};

const movesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...state,
        movesList: [],
      };
    case ADD_MOVE:
      return {
        ...state,
        movesList: [...state.movesList, action.move],
      };
    default:
      return state;
  }
};

export default movesReducer;
