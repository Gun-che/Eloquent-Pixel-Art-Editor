import { IState, IConfig, IPos } from './../ts/index';
import { elt } from '../utils/elt';
import { PictureCanvas } from "./Canvas";
import { keyDown } from '../utils/keyListener';

export class PixelEditor {
  state: IState;
  canvas: PictureCanvas;
  controls: any[];
  dom: HTMLElement;
  constructor(state: IState, config: IConfig) {
    let { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, (pos: IPos) => {
      let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);

      if (onMove) {
        return (pos: IPos) => onMove(pos, this.state);
      }
    });
    this.controls = controls.map(
      Control => new Control(state, config)
    );
    this.dom = elt('div', { tabIndex: 0 }, this.canvas.dom, elt('br', {}), ...this.controls.reduce((a, c) => a.concat(' ', c.dom), []));

    this.dom.addEventListener('keydown', keyDown(config))
  }

  syncState(state: IState) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) ctrl.syncState(state);
  }
}

