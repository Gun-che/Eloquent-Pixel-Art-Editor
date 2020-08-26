import { Picture } from "../Components/Picture"

export const drawPicture = (picture: Picture, canvas: HTMLCanvasElement, scale: number) => {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let cx = canvas.getContext('2d');

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      cx.fillStyle = (picture.pixel(x, y) as string);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}