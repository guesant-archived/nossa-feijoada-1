import express from 'express';
import * as controller from '../../../../controllers/UsersController';

const routes = express.Router();
routes.post('/', controller.ControllerNew);
routes.post('/login', controller.ControllerLogin);

export default routes;
