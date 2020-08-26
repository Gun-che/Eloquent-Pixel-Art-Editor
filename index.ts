import { updateState } from './src/state/updateState';
import { ToolSelect } from './src/Components/Tools/ToolSelect';
import { ColorSelect } from './src/Components/Tools/ColorSelect';
import { pick } from './src/Components/Tools/pickColor';
import { rectangle } from './src/Components/Tools/rectangle';
import { fill } from './src/Components/Tools/fill';
import { draw } from './src/Components/Tools/draw';
import { PixelEditor } from './src/Components/PixelEditor';
import { Picture } from './src/Components/Picture';
import { IAction } from './src/ts';

let state = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0")
};
let app = new PixelEditor(state, {
  tools: { draw, fill, rectangle, pick },
  controls: [ToolSelect, ColorSelect],
  dispatch(action: IAction) {
    state = updateState(state, action);
    app.syncState(state);
  }
});
document.querySelector("div").appendChild(app.dom);