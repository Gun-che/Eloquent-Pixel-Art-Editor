import { IState, IDispatch } from './../../ts/index';
import { elt } from './../../utils/elt';

export class ColorSelect {
  input: HTMLInputElement;
  dom: HTMLElement;
  constructor(state: IState, { dispatch }) {
    this.input = (elt('input', {
      type: 'color',
      value: state.color,
      onchange: () => dispatch({ color: this.input.value })
    }) as HTMLInputElement);
    this.dom = elt('label', null, '🎨 Цвет:', this.input)
  }

  syncState(state: IState): void {
    this.input.value = state.color;
  }
}