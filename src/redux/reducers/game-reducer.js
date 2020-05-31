import { CLEAR_PIECE_SELECTED, PIECE_SELECTED, RESET_GAME, SWITCH_PLAYER } from '../actionNames';

const initialState = {
  isWhiteMove: true,
  pieceSelected: '',
  gameWasReset: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...initialState,
        gameWasReset: true,
      };
    case SWITCH_PLAYER:
      return {
        ...state,
        isWhiteMove: !state.isWhiteMove,
      };
    case PIECE_SELECTED:
      return {
        ...state,
        pieceSelected: action.squareName,
      };
    case CLEAR_PIECE_SELECTED:
      return {
        ...state,
        pieceSelected: '',
      };
    default:
      return state;
  }
};

export default gameReducer;
