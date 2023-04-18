import { Texture } from "../Texture";
import { Field, IField } from "../components/Field";
import { Resource } from "../components/Resource";
import { UnitChicken } from "../components/Unit/UnitChicken";
import { UnitCow } from "../components/Unit/UnitCow";
import { UnitWheat } from "../components/Unit/UnitWheat";

const Farm = async () => {
  const texture = await Texture();

  const field = new Field(texture.grass);

  const coord = field.coords.map((coord: IField) => {
    if (!coord.isActive && coord.id % Math.floor(Math.random() * 3)) {
        new UnitCow(coord.x, coord.y, texture.cow)
        return {
          ...coord,
             isActive: true
        }
    }

    if (!coord.isActive && coord.id % Math.floor(Math.random() * 6)) {
        new UnitWheat(coord.x, coord.y, texture.wheat)
        return {
          ...coord,
          isActive: true
        }
    }

    if (!coord.isActive && coord.id % Math.floor(Math.random() * 3)) {
        new UnitChicken(coord.x, coord.y, texture.chicken)
        return {
          ...coord,
          isActive: true
        }
    }

    return coord
  })
  
  window._storeCoords.change(coord)

  new Resource(15, texture.wheat, window._storeResuorseWheat, false);
  new Resource(115, texture.milk, window._storeResuorseCows, true);
  new Resource(215, texture.egg, window._storeResuorseChickens, true);
  new Resource(315, texture.amount, window._storeResuorseAmount, false);
};

export default Farm;
