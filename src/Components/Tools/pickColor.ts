
export const pick = (pos, state, dispatch) => {
  dispatch({ color: state.picture.pixel(pos.x, pos.y) });
}