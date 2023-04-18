import { Unit } from "..";

export class UnitWheat extends Unit {
  constructor(x: number, y: number, texture: any) {
    super(x, y, texture, 10, window._storeResuorseWheat);

    this.toggleTimer(true);
    this.startTimer();
  }
}
