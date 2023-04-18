import { Assets, Graphics } from "pixijs";

export class Graphic {
  public graphic = new Graphics();

  constructor(
    rect: [number, number, number, number, number],
    background: number
  ) {
    this.graphic.beginFill(background);
    this.graphic.drawRoundedRect(...rect);
    this.graphic.endFill();
  }
}
