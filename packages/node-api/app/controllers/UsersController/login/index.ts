import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { UserDoc } from '../../../models/User';
import passport from '../../../config/passport';

export const validation = [
  check('account.username').not().isEmpty(),
  check('account.password').isLength({ min: 5 }),
];

const ControllerLogin: RequestHandler = async (req, res, next) => {
  passport.authenticate(
    'user',
    { session: false },
    (err, account: UserDoc, info) => {
      if (err) return next(err);

      const responseAccount = account;

      if (responseAccount) {
        (responseAccount as any).token = responseAccount.generateJWT();
        return res.json({ account: responseAccount.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
};

export default ControllerLogin;
