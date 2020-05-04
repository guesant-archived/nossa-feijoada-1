import express from 'express';
import users from './users';
import user from './user';
import templates from './templates';
import sources from './sources';

const routes = express.Router();
routes.use('/users', users);
routes.use('/user', user);
routes.use('/templates', templates);
routes.use('/sources', sources);

export default routes;
