import { Cell } from "../Cell";

export interface IField {
    id: number;
    x: number;
    y: number;
    isActive: boolean;
}

export interface ICoords {
    x: number;
    y: number;
}

export class Field {
    public coords: IField[] = []

  constructor(texture: any) {
    let id = 0;
    for (let i = 0; i < 8; i++) {
      const x = 100 * i;
      for (let j = 0; j < 8; j++) {
        const y = 100 * j;
        new Cell(x, y, texture);

        this.coords.push({
           id: id++,
           x,
           y,
           isActive: false
        })
      }
    }
  }
}
