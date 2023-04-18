import { autorun, get } from "mobx";
import { Container, Sprite, Text, Texture } from "pixijs";
import { StoreApp } from "../../Store/StoreApp";
import { StoreResuorse } from "../../Store/StoreResuorse";
import { Button } from "../Button";

export class Resource {
  private _widthIcon = 75;
  private _heightIcon = 75;

  private _storeApp: StoreApp;
  private _storeResuorse: StoreResuorse;
  private _storeResuorseAmount: StoreResuorse;

  private _icon: Sprite;
  private _text: Text;
  private _buttonSell: Container | any;
  private _isButtonSell: boolean;
  private _x = 850;

  constructor(
    y: number,
    texture: Texture,
    storeResuorse: StoreResuorse,
    isButtonSell: boolean = false
  ) {

    this._icon = new Sprite(texture);
    this._icon.x = this._x;
    this._icon.y = y;
    this._icon.width = this._widthIcon;
    this._icon.height = this._heightIcon;

    this._storeApp = window._storeApp;
    this._storeResuorse = storeResuorse;
    this._storeResuorseAmount = window._storeResuorseAmount;
    this._isButtonSell = isButtonSell;

    this._text = new Text(`${0}`, {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xffffff,
      align: "left",
    });

    this._text.x = this._x + 90;
    this._text.y = y + 15;

    this._buttonSell = new Button({
      x: this._x + 150,
      y: y + 25,
      text: "Продать",
      color: 0x00382f,
      fontSize: 16,
      background: 0xe5cc18,
    }).create();

    autorun(() => {
      const value = get(this._storeResuorse, "value");
      this._text.text = value;

      if (value === 0) {
        this.toggleButtonSell(false);
      } else {
        this.toggleButtonSell(true);
      }
    });

    this.addChilds();
  }

  get _isThereResuorse(): boolean {
    return this._storeResuorse.value > 0;
  }

  addChilds() {
    this._storeApp.addChild(this._icon);
    this._storeApp.addChild(this._text);

    if (this._isButtonSell) {
      this._buttonSell.interactive = true;
      this._storeApp.addChild(this._buttonSell);
      this.toggleButtonSell(false);
      this.addButtonСollectEvent();
    }
  }

  toggleButtonSell(is: boolean): void {
    this._buttonSell.visible = is;
  }

  addButtonСollectEvent(): void {
    this._buttonSell.on("pointerdown", () => {
      this._storeResuorse.decrement();
      this._storeResuorseAmount.addSumm();
    });
  }
}
