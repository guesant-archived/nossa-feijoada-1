import { RequestHandler } from 'express';
import { Image } from '../../models';
import { deletePublicImage } from '../../lib/upload-image';

const ControllerDelete: RequestHandler = async (req, res, next) => {
  return Image.findById(req.params.id)
    .then(async (image) => {
      if (!image || image.author.toHexString() !== (req as any).payload.id) {
        return res.sendStatus(401);
      }
      await Promise.all(
        image.files.map((file) => {
          deletePublicImage(file);
        }),
      );

      await Image.findByIdAndDelete(req.params.id);
      return res.send();
    })
    .catch(next);
};

export default [ControllerDelete];
