import { IState, IPos, IDispatch } from './../../ts/index';

export const draw = (pos: IPos, state: IState, dispatch: IDispatch) => {
  function drawPixel({ x, y }: IPos, state: IState) {
    let drawn = { x, y, color: state.color };
    dispatch({ picture: state.picture.draw([drawn]) });
  }
  drawPixel(pos, state);

  return drawPixel;
}