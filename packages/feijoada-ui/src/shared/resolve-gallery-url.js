const { VUE_APP_GALLERY_URL } = process.env;

const resolveGalleryUrl = (url) => {
  return url.replace(/^@public@/, VUE_APP_GALLERY_URL);
};

export default resolveGalleryUrl;
