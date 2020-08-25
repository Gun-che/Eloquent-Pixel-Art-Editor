
interface IPixel {
  x: number;
  y: number;
  color: string;
}

export class Picture {
  width: number;
  height: number;
  pixels: IPixel[]

  constructor(width: number, height: number, pixels: IPixel[]) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  static empty(width: number, height: number, color: string) {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  pixel(x: number, y: number) {
    return this.pixels[x + y * this.width];
  }

  draw(pixels: IPixel[]) {
    let copy = this.pixels.slice();

    for (let { x, y, color } of pixels) {
      (copy as string[])[x + y * this.width] = color;

    }
    return new Picture(this.width, this.height, copy);
  }
}