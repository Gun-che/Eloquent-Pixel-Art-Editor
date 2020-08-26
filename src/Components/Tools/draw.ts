
export const draw = (pos, state, dispatch) => {
  function drawPixel({ x, y }: { x: number, y: number }, state) {
    let drawn = { x, y, color: state.color };
    dispatch({ picture: state.picture.draw([drawn]) });
  }
  drawPixel(pos, state);

  return drawPixel;
}