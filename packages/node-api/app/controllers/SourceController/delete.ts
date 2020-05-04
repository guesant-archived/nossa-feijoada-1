import { RequestHandler } from 'express';
import { Source } from '../../models';

const ControllerDelete: RequestHandler = async (req, res, next) => {
  return Source.findById(req.params.id)
    .then(async (source) => {
      if (!source || source.author.toHexString() !== (req as any).payload.id) {
        return res.sendStatus(401);
      }

      await Source.findByIdAndDelete(req.params.id);
      return res.send();
    })
    .catch(next);
};

export default ControllerDelete;
