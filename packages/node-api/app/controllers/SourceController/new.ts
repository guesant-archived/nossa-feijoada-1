import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { Source } from '../../models';
import validationMiddleware from '../../middlewares/validation-middleware';

export const validation = [
  check('author').trim(),
  check('name').not().isEmpty().trim().isLength({ min: 1, max: 56 }).escape(),
  check('data').not().isEmpty().trim().isLength({ min: 1, max: 146 }).escape(),
];

const ControllerNew: RequestHandler = async (req, res, next) => {
  const source = new Source({
    author: req.body.author || (req as any).payload.id,
    name: req.body.name,
    description: req.body.description || '',
    image: req.body.image || '',
    imageTransparent: req.body.image || '',
  });

  source
    .save()
    .then(() => {
      return res.json(source);
    })
    .catch(next);
};

export default [validation, validationMiddleware, ControllerNew];
