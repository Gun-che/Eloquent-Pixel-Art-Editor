import { elt } from '../utils/elt';
import { IState, IAction, IConfig } from '../ts/index';

export const historyUpdateState = (state: IState, action: IAction) => {

	if (action.undo === true) {

		if (state.done.length === 0) {
			return state;
		}
		return Object.assign({}, state, {
			picture: state.done[0],
			done: state.done.slice(1),
			doneAt: 0,
		});

	} else if (action.picture && state.doneAt < Date.now() - 1000) {
		return Object.assign({}, state, action, {
			done: [state.picture, ...state.done],
			doneAt: Date.now(),
		});

	} else {
		return Object.assign({}, state, action);
	}
}

export class UndoButton {
	dom: HTMLButtonElement;

	constructor(state: IState, { dispatch }: IConfig) {
		this.dom = elt('button', {
			onclick: () => dispatch({ undo: true }),
			disabled: state.done.length === 0
		}, '⮪  Отменить') as HTMLButtonElement;
	}

	syncState(state: IState) {
		this.dom.disabled = state.done.length === 0;
	}
}