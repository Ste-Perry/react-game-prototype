import store from '@redux/store';
import { buildDefaultEntities } from '@utilities/entityUtility';
import { squareClicked } from '@redux/actions/squares-actions';
import { getSquareSelected, inBounds } from '@utilities/squareUtility';

const MovesSystem = (entities, { input }) => {
  const { game, squares } = store.getState();
  const result = game.gameWasReset ? buildDefaultEntities(game, squares) : { ...entities };

  const offset = 0;
  const xMax = 800;
  const yMax = 800;
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};

  if (inBounds({ location: payload, offset, xMax, yMax })) {
    const from = getSquareSelected(payload);
    store.dispatch(squareClicked({ game, squares, from }));
  }
  return result;
};

export default MovesSystem;
