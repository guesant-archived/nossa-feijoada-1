import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { User } from '../../../models';

export const validation = [
  check('account.username')
    .not()
    .isEmpty()
    .trim()
    .isLength({ max: 64 })
    .withMessage('Usuário muito longo')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('O usuário deve conter somente números e caracteres')
    .escape()
    .custom((value: string) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject('O usuário já está em uso.');
        }
      });
    }),
  check('account.email')
    .isEmail()
    .withMessage('E-mail inválido')
    .isLength({ max: 64 })
    .withMessage('E-mail muito longo')
    .normalizeEmail()
    .custom((value: string) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('O e-mail já está em uso');
        }
      });
    }),
  check('account.password')
    .isLength({ min: 5 })
    .withMessage('A senha deve conter pelo menos cinco caracteres.'),
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
