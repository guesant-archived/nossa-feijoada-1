import fabric from '../../fabric';
import loadImage from '../../load-image';
import { EMPTY_IMAGE } from '../../constants';

const ImportTemplateSource = async (source) => {
  if (source.type === 'slot') {
    const img = await loadImage(source.data.src || EMPTY_IMAGE);
    img.set(source.data);
    return img;
  } else if (source.type === 'text') {
    return new fabric.Textbox(source.data.text, source.data);
  }

  return {};
};
export default ImportTemplateSource;
