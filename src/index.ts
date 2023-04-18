import Farm from "./Farm";
import { StoreApp } from "./Store/StoreApp";
import { StoreCoords } from "./Store/StoreCoords";
import { StoreResuorse } from "./Store/StoreResuorse";

function component() {
  const app = (window._storeApp = new StoreApp());
  window._storeResuorseCows = new StoreResuorse();
  window._storeResuorseWheat = new StoreResuorse();
  window._storeResuorseChickens = new StoreResuorse();
  window._storeResuorseAmount = new StoreResuorse();
  window._storeCoords = new StoreCoords();

  Farm();

  return app.view;
}

document.body.appendChild(component());
