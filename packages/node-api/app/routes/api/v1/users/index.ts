import express from 'express';
import rateLimit from 'express-rate-limit';
import * as controller from '../../../../controllers/UsersController';
import validationMiddleware from '../../../../middlewares/validation-middleware';

const routes = express.Router();
routes.post(
  '/',
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: JSON.stringify({
      message:
        'Muitas requisições vindas deste IP. Tente novamente em uma hora.',
    }),
  }),
  controller.ControllerNew.validation,
  validationMiddleware,
  controller.ControllerNew.default,
);
routes.post(
  '/login',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: JSON.stringify({
      message:
        'Muitas requisições vindas deste IP. Tente novamente em 15 minutos.',
    }),
  }),
  controller.ControllerLogin.validation,
  validationMiddleware,
  controller.ControllerLogin.default,
);

export default routes;
