import { scale } from './../../Game/src/consts';
import { elt } from './utils/elt';
import { Picture } from './state/Picture';
import { drawPicture } from './utils/draw';

export class PictureCanvas {
  dom: HTMLElement;
  picture: Picture;

  constructor(picture: Picture, pointerDown) {
    this.dom = elt('canvas', {
      onmousedown: (e: MouseEvent) => this.mouse(e, pointerDown),
      ontouchstart: (e: TouchEvent) => this.touch(e, pointerDown)
    });

    this.syncState(picture);
  }

  syncState(picture: Picture) {
    if (this.picture === picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  }

  mouse(downEvent: MouseEvent, onDown) {

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

    function pointerPosition(pos: MouseEvent, domNode: HTMLElement) {
      let rect = domNode.getBoundingClientRect();
      return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale)
      }
    }
  };
}

