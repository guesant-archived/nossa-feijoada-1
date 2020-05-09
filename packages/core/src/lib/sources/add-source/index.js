import fabric from '../../fabric';
import * as computeSource from '../../computed/compute-source';
import { NEW_SOURCE } from '../../constants';
import loadImage from '../../load-image';
const { compute } = computeSource;

const getId = () => Math.floor(Math.random() * 10 ** 8);
export const newSource = async () => {
  const img = await loadImage(NEW_SOURCE.slot.initialImage);
  img.set(NEW_SOURCE.slot.options);

  const type = 'slot';
  return {
    object: img,
    source: {
      type: type,
      sourceId: getId(),
      computedValues: compute(type, img),
      options: {
        preferTransparent: true,
      },
      data: img,
    },
  };
};

export const newText = () => {
  const type = 'text';

  const text = new fabric.Textbox(
    NEW_SOURCE.text.defaultText,
    NEW_SOURCE.text.options,
  );
  return {
    object: text,
    source: {
      type: type,
      sourceId: getId(),
      computedValues: compute(type, text),
      data: text,
    },
  };
};
