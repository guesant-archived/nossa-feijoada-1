import { RequestHandler } from 'express';
import { UserDoc } from '../../../models/User';
import passport from '../../../config/passport';

const ControllerLogin: RequestHandler = async (req, res, next) => {
  if (!req.body.account.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }
  if (!req.body.account.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

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
