import { getCanvas, isMiniGame } from "./register";
import * as Mixin from "./util/mixin";

declare let my: any;

export class Image {
  constructor() {
    let image;
    if (isMiniGame()) {
      image = my.createImage();
    } else {
      const canvas = getCanvas();
      image = (canvas.createImage && canvas.createImage()) || {};
    }

    if (!("tagName" in image)) {
      image.tagName = "IMG";
      image.__proto__ = Image.prototype;
    }

    Mixin.parentNode(image);
    Mixin.classList(image);

    Object.assign(image, {
      addEventListener(name, cb) {
        image[`on${name}`] = cb.bind(image);
      },
      removeEventListener(name) {
        image[`on${name}`] = null;
      }
    });

    return image;
  }
}
