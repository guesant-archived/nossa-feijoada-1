import { Request } from 'express';
import jwt from 'express-jwt';
import config from '../../../config';

const getTokenFromHeader = (req: Request) => {
  const Authorization =
    req.headers.authorization ||
    (req.headers.Authorization as string | undefined);

  if (Authorization) {
    if (['Token', 'Bearer'].includes(Authorization.split(' ')[0])) {
      return Authorization.split(' ')[1];
    }
  }

  return null;
};

const auth = {
  required: jwt({
    secret: config.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
};

export default auth;
