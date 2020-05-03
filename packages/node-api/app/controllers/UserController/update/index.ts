import { RequestHandler } from 'express';
import { User } from '../../../models';

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
