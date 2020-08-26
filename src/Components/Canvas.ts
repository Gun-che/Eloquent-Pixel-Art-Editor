import { scale } from './../consts';
import { IPos } from './../ts/index';
import { elt } from '../utils/elt';
import { Picture } from './Picture';
import { drawPicture } from '../utils/drawPicture';

export class PictureCanvas {
  dom: HTMLCanvasElement;
  picture: Picture;

  constructor(picture: Picture, pointerDown: (pos: IPos) => void) {
    this.dom = (elt('canvas', {
      onmousedown: (e: MouseEvent) => this.mouse(e, pointerDown),
      ontouchstart: (e: TouchEvent) => this.touch(e, pointerDown)
    }) as HTMLCanvasElement);

    this.syncState(picture);
  }

  syncState(picture: Picture) {
    if (this.picture === picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  }

  mouse(downEvent: MouseEvent, onDown: (pos: IPos) => any) {

    if (downEvent.button !== 0) return;

    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);

    if (!onMove) return;

    let move = (moveEvent: MouseEvent) => {

      if (moveEvent.button === 0) {
        this.dom.removeEventListener('mousemove', move);

      } else {
        let newPos = pointerPosition(moveEvent, this.dom);

        if (newPos.x === pos.x && newPos.y === pos.y) return;

        pos = newPos;
        onMove(newPos);
      }
    };
    this.dom.addEventListener('mousemove', move);

  };



  touch(startEvent: TouchEvent, onDown: (pos: IPos) => any) {
    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();

    if (!onMove) return;

    let move = (moveEvent: TouchEvent) => {
      let newPos = pointerPosition(moveEvent.touches[0], this.dom);

      if (newPos.x === pos.x && newPos.y === pos.y) return;
      pos = newPos
      onMove(newPos);
    };
    let end = () => {
      this.dom.removeEventListener('touchmove', move);
      this.dom.removeEventListener('touchend', end);
    }

    this.dom.addEventListener('touchmove', move);
    this.dom.addEventListener('touchend', end);
  };
}



function pointerPosition(pos: (MouseEvent | { clientX: number, clientY: number }), domNode: HTMLElement) {
  let rect = domNode.getBoundingClientRect();
  return {
    x: Math.floor((pos.clientX - rect.left) / scale),
    y: Math.floor((pos.clientY - rect.top) / scale)
  }
}