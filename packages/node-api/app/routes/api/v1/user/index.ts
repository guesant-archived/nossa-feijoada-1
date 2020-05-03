import express from 'express';
import auth from '../auth';
import * as controller from '../../../../controllers/UserController';

const routes = express.Router();
routes.get('/', auth.required, controller.ControllerShowMe);
routes.put('/', auth.required, controller.ControllerUpdate);
routes.delete('/', auth.required, controller.ControllerDelete);

export default routes;
