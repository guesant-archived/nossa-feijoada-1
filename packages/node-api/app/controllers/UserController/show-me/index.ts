import { RequestHandler } from 'express';
import { User } from '../../../models';

const ControllerShowMe: RequestHandler = async (req, res, next) => {
  const { payload } = req as any;
  User.findById(payload.id)
    .then((account) => {
      if (!account) {
        return res.sendStatus(401);
      }

      return res.json({ account: account.publicJSON() });
    })
    .catch(next);
};

export default ControllerShowMe;
