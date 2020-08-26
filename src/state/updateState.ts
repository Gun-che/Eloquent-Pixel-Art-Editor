import { IState, IAction } from './../ts/index';

export const updateState = (state: IState, action: IAction) => {
  return Object.assign({}, state, action);
}