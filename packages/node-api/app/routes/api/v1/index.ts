import express from 'express';
import users from './users';
import user from './user';
import templates from './templates';
import sources from './sources';
import images from './images';

const routes = express.Router();
routes.use('/users', users);
routes.use('/user', user);
routes.use('/templates', templates);
routes.use('/sources', sources);
routes.use('/images', images);

export default routes;
