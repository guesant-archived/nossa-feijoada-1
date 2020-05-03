import { RequestHandler } from 'express';
import { User } from '../../../models';
import { ErrorHandlerArg } from '../../../types/ErrorHandler';

const ControllerDelete: RequestHandler = async (req, res, next) => {
  return User.findById((req as any).payload.id)
    .then(async (user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      if (!req.body.account?.password) {
        const error: ErrorHandlerArg = new Error(
          'Please enter the account password.'
        );
        error.status = 401;
        return next(error);
      }

      if (!user.validPassword(req.body.account?.password)) {
        const error: ErrorHandlerArg = new Error('Invalid password.');
        error.status = 401;
        return res.sendStatus(401);
      }

      await User.findByIdAndDelete((req as any).payload.id);
      return res.send();
    })
    .catch(next);
};

export default ControllerDelete;
