import { autorun, get } from "mobx";
import { Sprite } from "pixijs";
import { StoreApp } from "../../Store/StoreApp";
import { StoreCoords } from "../../Store/StoreCoords";

export class Cell {
  public cell: any;
  private _storeApp: StoreApp;
  private _storeCoords: StoreCoords;

  private _width = 100;
  private _height = 100;

  constructor(x: number, y: number, texture: any) {
    this.cell = new Sprite(texture);
    this.cell.x = x;
    this.cell.y = y;
    this.cell.width = this._width;
    this.cell.height = this._height;

    this._storeApp = window._storeApp;
    this._storeApp.addChild(this.cell);

    this._storeCoords = window._storeCoords;

    autorun(() => {
      const move = get(this._storeCoords, "move");
      const isActive = this._storeCoords.getMoveIsActive(this._width);
        if (
          move.x > x && 
          move.x <= x + this._width && 
          move.y > y && 
          move.y <= y + this._width && 
          !isActive
        ) {
          this.cell.alpha = 0.5;
        } else {
          this.cell.alpha = 1;
        }
    });
  }
}
