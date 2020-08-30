import { IState } from './src/ts/index';
import { line } from './src/Components/Tools/line';
import { circle } from './src/Components/Tools/circle';
import { UndoButton, historyUpdateState } from './src/history/index';
import { LoadButton } from './src/SaveAndLoad/Load';
import { ToolSelect } from './src/Components/Tools/ToolSelect';
import { ColorSelect } from './src/Components/Tools/ColorSelect';
import { pick } from './src/Components/Tools/pickColor';
import { rectangle } from './src/Components/Tools/rectangle';
import { fill } from './src/Components/Tools/fill';
import { draw } from './src/Components/Tools/draw';
import { PixelEditor } from './src/Components/PixelEditor';
import { Picture } from './src/Components/Picture';
import { IAction } from './src/ts';
import { SaveButton } from './src/SaveAndLoad/Save';

let state = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0"),
  done: [],
  doneAt: 0,
};

const baseTools = { draw, fill, rectangle, pick, circle, line }

const baseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];

function startPixelEditor({
  state: IState = state,
  tools = baseTools,
  controls = baseControls
}) {
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action: IAction) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    }
  });

  return app.dom;
}

document.querySelector("div").appendChild(startPixelEditor({}));