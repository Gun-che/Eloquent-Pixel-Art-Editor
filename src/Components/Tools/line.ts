import { IPos, IState, IDispatch } from './../../ts/index';

export function drawLine(from: IPos, to: IPos, color: string) {

  let points = [];

  if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {

    if (from.x > to.x) {
      [from, to] = [to, from];
    }

    let slope = (to.y - from.y) / (to.x - from.x);

    for (let { x, y } = from; x <= to.x; x++) {
      points.push({ x, y: Math.round(y), color });
      y += slope;
    }

  } else {

    if (from.y > to.y) {
      [from, to] = [to, from];
    }

    let slope = (to.x - from.x) / (to.y - from.y);

    for (let { x, y } = from; y <= to.y; y++) {
      points.push({ x: Math.round(x), y, color });
      x += slope;
    }
  }
  return points;
}

export const line = (pos: IPos, state: IState, dispatch: IDispatch) => {
  return (end: IPos) => {
    let line = drawLine(pos, end, state.color);
    dispatch({ picture: state.picture.draw(line) })
  }
}