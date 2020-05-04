import express from 'express';
import users from './users';
import user from './user';
import templates from './templates';

const routes = express.Router();
routes.use('/users', users);
routes.use('/user', user);
routes.use('/templates', templates);

export default routes;
