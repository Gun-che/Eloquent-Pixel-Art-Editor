import { IState } from './../ts/index';
import { elt } from './../utils/elt';
import { drawPicture } from '../utils/drawPicture';

export class SaveButton {
  picture: any;
  dom: HTMLButtonElement;
  constructor(state: IState) {
    this.picture = state.picture;
    this.dom = (elt('button', {
      onclick: () => this.save()
    }, '💾 Сохранить: ') as HTMLButtonElement)
  }

  save() {
    let canvas = (elt('canvas', {}) as HTMLCanvasElement);
    drawPicture(this.picture, canvas, 1);
    let link = elt('a', {
      href: canvas.toDataURL(),
      download: 'pixelart.png'
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  syncState(state: IState) {
    this.picture = state.picture
  }
} 