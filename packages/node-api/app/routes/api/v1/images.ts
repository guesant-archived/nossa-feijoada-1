import express from 'express';
import rateLimit from 'express-rate-limit';
import auth from './auth';
import * as controller from '../../../controllers/ImageController';

const routes = express.Router();
routes.post(
  '/upload/:type',
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 9,
    message: JSON.stringify({
      message:
        'Muitas requisições vindas deste IP. Tente novamente em uma hora.',
    }),
  }),
  auth.required,
  ...controller.ControllerNew.default,
);
routes.delete('/:id', auth.required, ...controller.ControllerDelete.default);

export default routes;
