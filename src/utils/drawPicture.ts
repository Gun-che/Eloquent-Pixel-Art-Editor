import { Picture } from "../Components/Picture"

export const drawPicture = (picture: Picture, canvas: HTMLCanvasElement, scale: number, previos?: Picture) => {

  if (previos == null ||
    previos.width !== picture.width ||
    previos.height !== picture.height) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    previos = null;
  }

  let cx = canvas.getContext('2d');

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {

      let color = picture.pixel(x, y);
      if (previos === null || previos.pixel(x, y) !== color) {

        cx.fillStyle = color;
        cx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}