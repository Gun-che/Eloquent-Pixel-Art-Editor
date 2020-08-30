import { IState, IPos, IDispatch } from './../../ts/index';
import { drawLine } from './line';

export const draw = (pos: IPos, state: IState, dispatch: IDispatch) => {
  function connect(newPos: IPos, state: IState) {
    let line = drawLine(pos, newPos, state.color);
    pos = newPos;
    dispatch({ picture: state.picture.draw(line) });
  }
  connect(pos, state);

  return connect;
}

