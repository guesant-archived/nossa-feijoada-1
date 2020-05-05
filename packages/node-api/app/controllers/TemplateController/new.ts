import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { Template } from '../../models';
import validationMiddleware from '../../middlewares/validation-middleware';

export const validation = [
  check('author').trim(),
  check('name').not().isEmpty().trim().isLength({ min: 1, max: 56 }).escape(),
];

const ControllerNew: RequestHandler = async (req, res, next) => {
  const template = new Template({
    author: (req as any).payload.id,
    name: req.body.name,
    description: req.body.description || '',
    template: req.body.template,
  });

  template
    .save()
    .then(() => {
      return res.json(template);
    })
    .catch(next);
};

export default [
  validation,
  validationMiddleware,
  ControllerNew,
];
