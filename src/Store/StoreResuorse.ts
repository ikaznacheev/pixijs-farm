import { action, makeObservable, observable } from "mobx";

export class StoreResuorse {
  value: number | null = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      increment: action,
      decrement: action,
    });
  }

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  addSumm() {
    this.value += 50;
  }
}
