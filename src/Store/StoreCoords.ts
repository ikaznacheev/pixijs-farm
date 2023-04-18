import { action, makeObservable, observable } from "mobx";
import { ICoords, IField } from "../components/Field";

export class StoreCoords {
  arr: IField[] = [];
  move: ICoords = {
    x: 0,
    y: 0
  };

  constructor() {
    makeObservable(this, {
      arr: observable,
      move: observable,
      change: action,
    });
  }

  change(arr: IField[]) {
    this.arr = arr;
  }

  setActive(id: number, oldId: number) {
    this.arr[id].isActive = true
    this.arr[oldId].isActive = false
  }

  setMove(move: ICoords) {
    this.move = move;
  }

  getMoveIsActive(n: number): boolean {
    const id = this.arr.filter((coord: IField) => 
      this.move.x > coord.x  && 
      this.move.x <= coord.x + n && 
      this.move.y > coord.y && 
      this.move.y <= coord.y + n)[0]
      
    return id?.isActive
  }
}
