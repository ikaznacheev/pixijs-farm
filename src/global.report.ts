import { IField } from "./components/Field";
import { StoreApp } from "./Store/StoreApp";
import { StoreCoords } from "./Store/StoreCoords";
import { StoreResuorse } from "./Store/StoreResuorse";

declare global {
  interface Window {
    _storeApp: StoreApp;
    _storeResuorseAmount: StoreResuorse;
    _storeResuorseCows: StoreResuorse;
    _storeResuorseWheat: StoreResuorse;
    _storeResuorseChickens: StoreResuorse;
    _storeCoords: StoreCoords;
  }
}

export default global;
