import { RequestHandler } from 'express';
import { Source } from '../../models';

const ControllerShow: RequestHandler = async (req, res, next) => {
  Source.findById(req.params.id)
    .populate({ path: 'author', select: 'username' })
    .then((source) => {
      if (!source) {
        return res.sendStatus(404);
      }

      return res.json(source);
    })
    .catch(next);
};

export default ControllerShow;
