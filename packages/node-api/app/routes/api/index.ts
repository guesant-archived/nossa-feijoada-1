import express from 'express';
import slowDown from 'express-slow-down';
import rateLimit from 'express-rate-limit';
import v1 from './v1';

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: 600,
});
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 500,
  message: JSON.stringify({
    message: 'Muitas requisições vindas deste IP. Tente novamente em uma hora',
  }),
});
const routes = express.Router();

routes.use(speedLimiter);
routes.use(rateLimiter);
routes.use('/v1', v1);

export default routes;
