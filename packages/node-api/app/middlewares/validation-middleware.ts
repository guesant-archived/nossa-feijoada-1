import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const validationMiddleware: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

export default validationMiddleware;
