import { IState, IConfig } from './../../ts/index';
import { elt } from './../../utils/elt';

export class ToolSelect {
  select: HTMLSelectElement;
  dom: HTMLElement;
  constructor(state: IState, { tools, dispatch }: IConfig) {
    this.select = (elt('select', {
      onchange: () => dispatch({ tool: this.select.value })
    }, ...Object.keys(tools).map(name => elt('option', {
      selected: name === state.tool
    }, name))) as HTMLSelectElement);
    this.dom = elt('label', null, '🖌 Инструмент:', this.select);
  }

  syncState(state: IState) {
    this.select.value = state.tool;
  }
}
