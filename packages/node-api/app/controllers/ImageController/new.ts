import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { RequestHandler } from 'express';
import { uploadImageOptions, uploadPublicImage } from '../../lib/upload-image';
import PublicImage from '../../models/Image';

const ControllerNew: RequestHandler = async (req, res, next) => {
  const { type } = req.params;
  if (!['templates', 'sources'].includes(type as string)) {
    return res.status(400);
  }

  const imageId = new mongoose.Types.ObjectId();
  interface NewFileNames {
    [key: string]: string;
  }
  const newFileNames: NewFileNames = {};

  await Promise.all(
    Object.entries(req.files || {}).map(async ([_, file], idx) => {
      const originalFileName = (file as fileUpload.UploadedFile).name;
      if (newFileNames[originalFileName]) {
        return;
      }

      const dest = `${type}/${imageId}-${idx}.png`;
      await uploadPublicImage(file as fileUpload.UploadedFile, dest);
      newFileNames[originalFileName] = dest;
    }),
  );

  const image = new PublicImage({
    _id: imageId,
    author: (req as any).payload.id,
    files: Object.values(newFileNames),
  });

  image
    .save()
    .then(() => {
      return res.json(Object.entries(newFileNames));
    })
    .catch(next);
};

export default [fileUpload(uploadImageOptions), ControllerNew];
