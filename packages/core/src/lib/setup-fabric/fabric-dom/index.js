import fabric from '../../fabric';

const SetupFabricDom = (wrapper, { template, preview: { scale } }) => {
  const canvasId = `c-${Math.floor(Math.random() * 10 ** 8)}`;
  wrapper.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.id = canvasId;
  canvas.width = template.width;
  canvas.height = template.height;

  if (scale) {
    canvas.style.transform = `scale(${scale})`;
  }
  wrapper.appendChild(canvas);

  return new fabric.Canvas(canvasId);
};

export default SetupFabricDom;
