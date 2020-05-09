import { RequestHandler } from 'express';
import { PublicImage } from '../../models';
import { deletePublicImage } from '../../lib/public-image';

const ControllerDelete: RequestHandler = async (req, res, next) => {
  return PublicImage.findById(req.params.id)
    .then(async (image) => {
      if (!image || image.author.toHexString() !== (req as any).payload.id) {
        return res.sendStatus(401);
      }
      await Promise.all(
        image.files.map((file) => {
          deletePublicImage(file);
        }),
      );

      await PublicImage.findByIdAndDelete(req.params.id);
      return res.send();
    })
    .catch(next);
};

export default [ControllerDelete];
