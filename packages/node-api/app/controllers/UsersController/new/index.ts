import { RequestHandler } from 'express';
import { User } from '../../../models';

const ControllerNew: RequestHandler = async (req, res, next) => {
  const user = new User();

  const { username, email, password } = req.body.account;
  user.username = username;
  user.email = email;
  user.setPassword(password);

  user
    .save()
    .then(() => {
      return res.json({ account: user.toAuthJSON() });
    })
    .catch(next);
};

export default ControllerNew;
