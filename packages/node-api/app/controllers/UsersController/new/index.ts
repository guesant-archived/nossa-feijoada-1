import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { User } from '../../../models';

export const validation = [
  check('account.username')
    .not()
    .isEmpty()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Must only contain characters and numbers')
    .escape()
    .custom((value: string) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
  check('account.email')
    .isEmail()
    .normalizeEmail()
    .custom((value: string) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  check('account.password')
    .isLength({ min: 5 })
    .withMessage('Must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('Must contain a number'),
];

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
