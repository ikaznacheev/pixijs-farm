import { autorun } from "mobx";
import { Unit } from "..";

export class UnitCow extends Unit {
  constructor(x: number, y: number, texture: any) {
    super(x, y, texture, 20, window._storeResuorseCows);

    this.addButtonFeed();
    this.addAutorunStore();
  }
}
