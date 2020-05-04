import { RequestHandler } from 'express';
import { Source } from '../../models';
import { validation } from './new';
import validationMiddleware from '../../middlewares/validation-middleware';
export { validation };

const ControllerUpdate: RequestHandler = async (req, res, next) => {
  Source.findById(req.params.id)
    .then((source) => {
      if (!source || source.author.toHexString() !== (req as any).payload.id)
        return res.sendStatus(401);

      const { author, name, description, data: data } = req.body;

      if (author) {
        source.author = author;
      }
      if (name) {
        source.name = name;
      }
      if (description) {
        source.description = description;
      }
      if (data) {
        source.data = data;
      }

      return source.save().then(() => {
        return res.json(source);
      });
    })
    .catch(next);
};

export default [validation, validationMiddleware, ControllerUpdate];
