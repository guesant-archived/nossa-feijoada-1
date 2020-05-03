import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';

export default function getStrategy(Account: mongoose.Model<any, {}>) {
  return new LocalStrategy(
    {
      usernameField: 'account[email]',
      passwordField: 'account[password]',
    },
    (email: string, password: string, done: any) => {
      Account.findOne({ email: email })
        .then((account) => {
          if (!account || !account.validPassword(password)) {
            return done(null, false, {
              message: 'invalid email ou password',
            });
          }

          return done(null, account);
        })
        .catch(done);
    }
  );
}
