import express from 'express';
import auth from './auth';
import * as controller from '../../../controllers/TemplateController';

const routes = express.Router();
routes.get('/', controller.ControllerSearch.default);
routes.post('/', auth.required, ...controller.ControllerNew.default);
routes.get('/:id', controller.ControllerShow.default);
routes.put('/:id', auth.required, ...controller.ControllerUpdate.default);
routes.delete('/:id', auth.required, controller.ControllerDelete.default);

export default routes;
