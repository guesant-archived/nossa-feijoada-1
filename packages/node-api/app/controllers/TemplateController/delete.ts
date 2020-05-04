import { RequestHandler } from 'express';
import { Template } from '../../models';

const ControllerDelete: RequestHandler = async (req, res, next) => {
  return Template.findById(req.params.id)
    .then(async (template) => {
      if (!template || template.author !== (req as any).payload.id) {
        return res.sendStatus(401);
      }

      await Template.findByIdAndDelete(req.params.id);
      return res.send();
    })
    .catch(next);
};

export default ControllerDelete;
