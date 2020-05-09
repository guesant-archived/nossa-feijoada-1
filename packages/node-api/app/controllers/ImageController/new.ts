import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { RequestHandler } from 'express';
import { uploadImageOptions, uploadPublicImage } from '../../lib/public-image';
import PublicImage from '../../models/PublicImage';

interface RenamedFileNames {
  [key: string]: string;
}

const ControllerNew: RequestHandler = async (req, res, next) => {
  const { type } = req.params;
  if (!['templates', 'sources'].includes(type as string)) {
    return res.status(400);
  }

  const imageId = new mongoose.Types.ObjectId();
  const renamedFileNames: RenamedFileNames = {};

  await Promise.all(
    Object.entries(req.files || {}).map(async ([formname, _file], idx) => {
      const file = Array.isArray(_file) ? _file[0] : _file;
      const dest = `gallery/${type}/${imageId}-${idx}.png`;
      await uploadPublicImage(file, dest).catch(next);
      renamedFileNames[formname] = dest;
    }),
  ).catch(next);

  const image = new PublicImage({
    _id: imageId,
    author: (req as any).payload.id,
    files: Object.values(renamedFileNames),
  });

  image
    .save()
    .then((doc) => {
      return res.json({ doc, files: renamedFileNames });
    })
    .catch(next);
};

export default [fileUpload(uploadImageOptions), ControllerNew];
