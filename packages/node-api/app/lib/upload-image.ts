import fs from 'fs';
import { join } from 'path';
import fileUpload from 'express-fileupload';
import env from '../env';

const { PUBLIC_PATH = '' } = env;
export const uploadImageOptions: fileUpload.Options = {
  abortOnLimit: true,
  safeFileNames: true,
};

export const uploadPublicImage = async (
  image: fileUpload.UploadedFile,
  dest: string,
) => {
  return image.mv(join(PUBLIC_PATH, dest));
};

export const deletePublicImage = async (path: string) => {
  return fs.unlinkSync(join(PUBLIC_PATH, path));
};
