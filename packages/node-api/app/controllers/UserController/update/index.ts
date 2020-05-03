import { RequestHandler } from 'express';
import { check } from 'express-validator';
import validator from 'validator';
import { User } from '../../../models';

export const validation = [
  check('account.username').custom(async (value = '') => {
    if (value.trim()) {
      await User.findOne({ username: value.trim() }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }
  }),
  check('account.email').custom(async (value = '') => {
    if (value.trim()) {
      if (!validator.isEmail(value.trim())) {
        return Promise.reject('Must be a valid email');
      }
      await User.findOne({ email: value.trim() }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }
  }),
];

const ControllerUpdate: RequestHandler = async (req, res, next) => {
  User.findById((req as any).payload.id)
    .then((account) => {
      if (!account) return res.sendStatus(401);

      ['username', 'email', 'image'].forEach((updateItem) => {
        const updateTo = req.body.user[updateItem];
        if (typeof updateTo !== 'undefined') {
          (account as any)[updateItem] = updateTo;
        }
      });

      if (typeof req.body.account.password !== 'undefined') {
        account.setPassword(req.body.account.password);
      }

      return account.save().then(() => {
        return res.json({ account: account.toAuthJSON() });
      });
    })
    .catch(next);
};

export default ControllerUpdate;
