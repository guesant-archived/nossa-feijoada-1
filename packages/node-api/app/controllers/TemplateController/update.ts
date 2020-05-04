import { RequestHandler } from 'express';
import { Template } from '../../models';
import { validation } from './new';
import validationMiddleware from '../../middlewares/validation-middleware';
export { validation };

const ControllerUpdate: RequestHandler = async (req, res, next) => {
  Template.findById(req.params.id)
    .then((template) => {
      if (!template || template.author !== (req as any).payload.id)
        return res.sendStatus(401);

      const { author, name, description, template: templateData } = req.body;

      if (author) {
        template.author = author;
      }
      if (name) {
        template.name = name;
      }
      if (description) {
        template.description = description;
      }
      if (templateData) {
        template.template = templateData;
      }

      return template.save().then(() => {
        return res.json(template);
      });
    })
    .catch(next);
};

export default [validation, validationMiddleware, ControllerUpdate];
