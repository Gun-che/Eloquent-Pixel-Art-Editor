import { IPos, IState, IDispatch } from './../../ts/index';

export const pick = (pos: IPos, state: IState, dispatch: IDispatch) => {
  dispatch({ color: (state.picture.pixel(pos.x, pos.y) as string) });
}