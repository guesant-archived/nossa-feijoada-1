import express from 'express';
import auth from './auth';
import * as controller from '../../../controllers/ImageController';

const routes = express.Router();
routes.post(
  '/upload/:type',
  auth.required,
  ...controller.ControllerNew.default,
);
routes.delete('/:id', auth.required, ...controller.ControllerDelete.default);

export default routes;
