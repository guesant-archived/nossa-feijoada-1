import fabric from '../fabric';
import { LOAD_IMAGE } from '../constants';

const loadImage = (url, options = {}) =>
  new Promise((resolve) => {
    fabric.Image.fromURL(url, resolve, {
      ...LOAD_IMAGE.defaultOptions,
      ...options,
      ...LOAD_IMAGE.strictOptions,
    });
  });

export default loadImage;
