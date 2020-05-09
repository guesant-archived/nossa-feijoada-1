import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';

export default function getStrategy(Account: mongoose.Model<any, {}>) {
  return new LocalStrategy(
    {
      usernameField: 'account[username]',
      passwordField: 'account[password]',
    },
    (username: string, password: string, done: any) => {
      Account.findOne({ username: username })
        .then((account) => {
          if (!account || !account.validPassword(password)) {
            return done(null, false, {
              message: 'Usuário ou senha inválida.',
            });
          }

          return done(null, account);
        })
        .catch(done);
    }
  );
}
