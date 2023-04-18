import { Unit } from "..";

export class UnitChicken extends Unit {
  constructor(x: number, y: number, texture: any) {
    super(x, y, texture, 10, window._storeResuorseChickens);

    this.addButtonFeed();
    this.addAutorunStore();
  }
}
