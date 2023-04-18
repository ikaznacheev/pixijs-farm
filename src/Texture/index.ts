import { Assets } from "pixijs";

export interface ITexture {
  grass: any;
  cow: any;
  wheat: any;
  chicken: any;
  egg: any;
  milk: any;
  amount: any;
}

export const Texture = async (): Promise<ITexture> => {
  return await {
    grass: await Assets.load("./images/grass.png"),
    cow: await Assets.load("./images/cow.png"),
    wheat: await Assets.load("./images/wheat.png"),
    chicken: await Assets.load("./images/chicken.png"),
    egg: await Assets.load("./images/egg.png"),
    milk: await Assets.load("./images/milk.png"),
    amount: await Assets.load("./images/amount.png"),
  };
};
