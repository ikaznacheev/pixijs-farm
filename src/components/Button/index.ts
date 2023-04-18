import { Container, Text } from "pixijs";
import { Graphic } from "../Graphic";

export interface IButton {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: number;
  background: number;
}

export class Button {
  private _x: number;
  private _y: number;
  private _text: string;
  private _color: number;
  private _fontSize: number;
  private _background: number;
  private _width = 80;
  private _height = 30;

  constructor({ x, y, text, fontSize, color = 0xffffff, background }: IButton) {
    this._x = x;
    this._y = y;
    this._text = text;
    this._color = color;
    this._fontSize = fontSize;
    this._background = background;
  }

  create(): any {
    const button = new Graphic(
      [this._x, this._y, this._width, this._height, this._width / 2],
      this._background
    );

    const buttonText = new Text(this._text, {
      fontFamily: "Arial",
      fontSize: this._fontSize,
      fill: this._color,
      align: "left",
    });

    buttonText.x = this._x + this._width * 0.1;
    buttonText.y = this._y + this._height * 0.2;

    const buttonContainer: any = new Container();
    buttonContainer.addChild(button.graphic);
    buttonContainer.addChild(buttonText);

    buttonContainer.interactive = true;

    buttonContainer.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });

    buttonContainer.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });

    return buttonContainer;
  }
}
