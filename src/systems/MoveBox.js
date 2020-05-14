const MoveBox = (entities, { input }) => {
  const { payload } = input.find(x => x.name === 'onMouseDown') || {};
  if (payload) {
    const box = entities.box1;
    box.x = payload.pageX;
    box.y = payload.pageY;
  }
  return entities;
};

export default MoveBox;
