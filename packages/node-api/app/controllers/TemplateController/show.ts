import { RequestHandler } from 'express';
import { Template } from '../../models';

const ControllerShow: RequestHandler = async (req, res, next) => {
  Template.findById(req.params.id)
    .populate({ path: 'author', select: 'username' })
    .then((template) => {
      if (!template) {
        return res.sendStatus(404);
      }

      return res.json(template);
    })
    .catch(next);
};

export default ControllerShow;
