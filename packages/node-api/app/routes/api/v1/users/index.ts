import express from 'express';
import * as controller from '../../../../controllers/UsersController';
import validationMiddleware from '../../../../middlewares/validation-middleware';

const routes = express.Router();
routes.post(
  '/',
  controller.ControllerNew.validation,
  validationMiddleware,
  controller.ControllerNew.default
);
routes.post(
  '/login',
  controller.ControllerLogin.validation,
  validationMiddleware,
  controller.ControllerLogin.default
);

export default routes;
