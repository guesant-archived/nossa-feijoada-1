import passport from 'passport';
import AccountStrategy from './account-strategy';
import { User } from '../../models';

passport.use('user', AccountStrategy(User));

export default passport;
