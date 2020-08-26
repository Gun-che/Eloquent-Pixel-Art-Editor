import { around } from "../../consts";

export const fill = ({ x, y }, state, dispatch) => {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{ x, y, color: state.color }];

  for (let done = 0; done < drawn.length; done++) {
    for (const { dx, dy } of around) {
      let x = drawn[done].x + dx;
      let y = drawn[done].y + dy;

      if (x >= 0 && x < state.picture.width &&
        y >= 0 && y < state.picture.height &&
        state.picture.pixel(x, y) === targetColor &&
        !drawn.some(p => p.x === x && p.y === y)) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
}