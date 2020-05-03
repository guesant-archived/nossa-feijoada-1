import express from 'express';
import users from './users';
import user from './user';

const routes = express.Router();
routes.use('/users', users);
routes.use('/user', user);

export default routes;
