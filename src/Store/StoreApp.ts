import { Application, Container, DisplayObject, ICanvas } from "pixijs";

export class StoreApp {
  public app: Application;
  public stage: Container<DisplayObject>;
  public view: ICanvas | any;

  constructor() {
    this.app = new Application({
      width: 1207,
      height: 800,
      backgroundColor: "#00382f",
    });
    this.stage = this.app.stage;
    this.view = this.app.view;
  }

  addChild(child: any): void {
    this.stage.addChild(child);
  }
}
