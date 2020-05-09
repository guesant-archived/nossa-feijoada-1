export const LOAD_IMAGE = {
  defaultOptions: {},
  strictOptions: {
  },
};
export const EMPTY_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export const NEW_SOURCE = {
  slot: {
    initialImage: EMPTY_IMAGE,
    options: {
      width: 250,
      height: 250,
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
    },
  },
  text: {
    defaultText: 'eis que a 10/10 vim diesel',
    options: {
      width: 640,
      textAlign: 'center',
      fontFamily: 'sans-serif',
      lineHeight: 1,
    },
  },
};

export const RENDER_CANVAS = {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backgroundImage: {
    options: {
      selectable: false,
    },
  },
};
