import { Picture } from './../Components/Picture';
import { elt } from './../utils/elt';
import { IConfig, IDispatch } from './../ts/index';

export class LoadButton {
  dom: HTMLButtonElement;
  constructor(_: any, { dispatch }: IConfig) {
    this.dom = elt('button', {
      onclick: () => startLoad(dispatch),
    }, '📁 Загрузить: ') as HTMLButtonElement
  }

  syncState() { }
}

function startLoad(dispatch: IDispatch) {
  let input = elt('input', {
    type: 'file',
    onchange: () => finishLoad(input.files[0], dispatch)
  }) as HTMLInputElement;
  document.body.appendChild(input);
  input.click();
  input.remove();
}

function finishLoad(file: File, dispacth: IDispatch) {

  if (file === null) return;

  let reader = new FileReader();
  reader.addEventListener('load', () => {
    let image = elt('img', {
      onload: () => dispacth({
        picture: pictureFromImage(image)
      }),
      src: reader.result
    }) as HTMLImageElement;
  });
  reader.readAsDataURL(file)
}

function pictureFromImage(image: HTMLImageElement) {
  let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);

  let canvas = elt('canvas', { width, height }) as HTMLCanvasElement;

  let cx = canvas.getContext('2d');
  cx.drawImage(image, 0, 0);
  let pixels = [];
  let { data } = cx.getImageData(0, 0, width, height);

  function hex(n: number) {
    return n.toString(16).padStart(2, '0');
  }

  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3);
    pixels.push('#' + hex(r) + hex(g) + hex(b));
  }

  return new Picture(width, height, pixels);
}