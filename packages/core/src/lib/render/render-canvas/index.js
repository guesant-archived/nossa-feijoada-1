import loadImage from '../../load-image';
import { EMPTY_IMAGE, RENDER_CANVAS } from '../../constants';

const RenderCanvas = async ({ fabric, template }) => {
  fabric.setBackgroundColor(RENDER_CANVAS.backgroundColor);
  const background = await loadImage(template.base || EMPTY_IMAGE);
  background.set(RENDER_CANVAS.backgroundImage.options);
  fabric.add(background);

  template.sources.forEach((objectWrapper) => {
    fabric.add(objectWrapper.data);
  });

  if (!template.baseBack) {
    background.bringToFront();
  } else {
    background.sendToBack();
  }

  fabric.requestRenderAll();
};

export default RenderCanvas;
