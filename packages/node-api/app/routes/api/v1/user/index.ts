import express from 'express';
import auth from '../auth';
import * as controller from '../../../../controllers/UserController';
import validationMiddleware from '../../../../middlewares/validation-middleware';

const routes = express.Router();
routes.get('/', auth.required, controller.ControllerShowMe.default);
routes.put(
  '/',
  controller.ControllerUpdate.validation,
  validationMiddleware,
  auth.required,
  controller.ControllerUpdate.default
);
routes.delete('/', auth.required, controller.ControllerDelete.default);

export default routes;
