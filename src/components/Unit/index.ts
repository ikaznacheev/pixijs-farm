import { autorun } from "mobx";
import { Container, Sprite, Text } from "pixijs";
import { StoreApp } from "../../Store/StoreApp";
import { StoreCoords } from "../../Store/StoreCoords";
import { StoreResuorse } from "../../Store/StoreResuorse";
import { Button } from "../Button";
import { ICoords, IField } from "../Field";
import { Graphic } from "../Graphic";

export class Unit {
  public unit: any;

  private _root: any = new Container();
  private _container: any = new Container();

  private _x: number;
  private _y: number;
  private _count: number;
  private _width = 100;
  private _height = 100;

  private _buttonTimer: Graphic | any;
  private _buttonTimerText: Text | any;
  private _buttonFeed: Container | any;
  private _buttonСollect: Container | any;
  private _timerActive: boolean = false;

  private _storeApp: StoreApp;
  private _storeResuorse: StoreResuorse;
  private _storeCoords: StoreCoords;

  public storeResuorseWheat: StoreResuorse;

  constructor(
    x: number,
    y: number,
    texture: any,
    count?: number,
    storeResuorse?: any
  ) {
    this.unit = new Sprite(texture);

    this._storeApp = window._storeApp;
    this._storeResuorse = storeResuorse;
    this._storeCoords = window._storeCoords;
    this.storeResuorseWheat = window._storeResuorseWheat;

    this._x = x;
    this._y = y;

    this._root.x = this._x;
    this._root.y = this._y;

    this.unit.width = this._width;
    this.unit.height = this._height;

    this._count = count;

    this._root.addChild(this._container)
    this._storeApp.addChild(this._root)

    this.addUnit();
    this.addButtonTimer();
    this.addButtonСollect();

    this.toggleTimer(false);
    this.addEventsContainer();
    this.addEventsDragAndDrop();
  }

  get _isThereResuorseWheat(): boolean {
    return this.storeResuorseWheat.value > 0;
  }

  startTimer(): void {
    let count = this._count;
    this._timerActive = true;

    const timer = setInterval(() => {
      count--;

      this._buttonTimerText.text = count;

      if (count === 0) {
        switch (this._storeResuorse) {
          case this.storeResuorseWheat:
            this.toggleButtonСollect(true);
            break;
          default:
            if (this._isThereResuorseWheat) {
              this.toggleButtonFeed(true);
            }
            break;
        }

        this.toggleTimer(false);
        this._timerActive = false;
        clearInterval(timer);
        this._buttonTimerText.text = this._count;
      }
    }, 1000);
  }

  addUnit(): void {
    this._container.addChild(this.unit);
  }

  addButtonTimer(): void {
    this._buttonTimer = new Graphic(
      [
        this._width * 0.75,
        this._height * 0.75,
        this._width * 0.25,
        this._width * 0.25,
        this._width * 0.4,
      ],
      0x009688
    );

    this._buttonTimerText = new Text(this._count, {
      fontFamily: "Arial",
      fontSize: 11,
      fill: 0xffffff,
      align: "center",
    });

    this._buttonTimerText.x = this._width * 0.83;
    this._buttonTimerText.y = this._height * 0.8;

    this._container.addChild(this._buttonTimer.graphic);
    this._container.addChild(this._buttonTimerText);
  }

  addAutorunStore(): void {
    autorun(() => {
      if (this._isThereResuorseWheat) {
        if (!this._timerActive) {
            this.toggleButtonFeed(true);
        }
      } else {
        this.toggleButtonFeed(false);
      }
    });
  }

  addButtonFeed(): void {
    this._buttonFeed = new Button({
      x: this._width * 0.1,
      y: this._height * 0.4,
      text: "Накормить",
      fontSize: 13,
      color: 0xffffff,
      background: 0x009688,
    }).create();

    this.toggleButtonFeed(false);

    this._root.addChild(this._buttonFeed);

    this._buttonFeed.on("pointerdown", () => {
      if (this._isThereResuorseWheat) {
        this.storeResuorseWheat.decrement();
        this._storeResuorse.increment();
        this.toggleButtonFeed(false);
        this.toggleTimer(true);
        this.startTimer();
      }
    });
  }

  addButtonСollect(): void {
    this._buttonСollect = new Button({
      x: this._width * 0.1,
      y: this._height * 0.4,
      text: "Собрать",
      fontSize: 16,
      color: 0xffffff,
      background: 0xdb5e1a,
    }).create();

    this.toggleButtonСollect(false);

    this._root.addChild(this._buttonСollect);

    this.addButtonСollectEvent();
  }

  addButtonСollectEvent(): void {
    this._buttonСollect.on("pointerdown", () => {
      this.toggleButtonСollect(false);
      this.toggleTimer(true);
      this.startTimer();
      this._storeResuorse.increment();

      switch (this._storeResuorse) {
        case this.storeResuorseWheat:
          break;
        default:
          if (this._isThereResuorseWheat) {
            this._storeResuorse.increment();
            this.storeResuorseWheat.decrement();
          }
          break;
      }
    });
  }

  toggleButtonСollect(is: boolean): void {
    this._buttonСollect.visible = is;
  }

  toggleButtonFeed(is: boolean): void {
    this._buttonFeed.visible = is;
  }

  toggleTimer(is: boolean): void {
    this._buttonTimer.graphic.visible = is;
    this._buttonTimerText.visible = is;
  }

  addEventsContainer() {
    this._container.interactive = true;

    this._container.on('mouseover', function () {
        document.body.style.cursor = 'move';
    });

    this._container.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
  }

  addEventsDragAndDrop() {
    this._root.interactive = true;
    const canvas = document.querySelector('canvas')

    let pageX = 0
    let pageY = 0

    let moveX = 0
    let moveY = 0

    const mousemove = (e: MouseEvent) => {
        pageX = (e.pageX * devicePixelRatio) 
        pageY = (e.pageY * devicePixelRatio)

        moveX = pageX - (this._width / 2)
        moveY = pageY - (this._height / 2)

        this._root.x = moveX;
        this._root.y = moveY;

        const move: ICoords = {
          x: moveX,
          y: moveY
        }

        this._storeCoords.setMove(move)
    }

    const mouseup = (e: MouseEvent) => {
      canvas.removeEventListener('mouseup', mouseup, false)
      canvas.removeEventListener('mousemove', mousemove, false)

      let isMove = false

      this._storeCoords.arr.forEach((coord: IField, index: number, arr: IField[]) => {
        if (!coord.isActive) {
          if (
              pageX > coord.x &&
              pageX <= coord.x + this._width &&
              pageY > coord.y &&
              pageY <= coord.y + this._height
          ) {
              const old = arr.filter((coord: IField) => coord.x === this._x && coord.y === this._y )[0]

              this._root.x = coord.x
              this._root.y = coord.y
              isMove = true;
              
              this._storeCoords.setActive(coord.id, old?.id);
          }
        }
      })
      
      if (!isMove) {
        this._root.x = this._x
        this._root.y = this._y
      }
    }

    this._root.on('mousedown', function (e: Event) {        
        canvas.addEventListener('mouseup', mouseup, false)
        canvas.addEventListener('mousemove', mousemove, false)
    });
  }
}
