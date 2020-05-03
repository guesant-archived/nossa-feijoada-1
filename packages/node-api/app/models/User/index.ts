import mongoose from 'mongoose';
import * as account from '../Account';

const UserSchema = account.getAccountSchema({
  name: String,
  image: String,
});

export interface UserDoc extends account.AccountDoc {
  name: string;
  image: string;
  publicJSON: () => any;
}

UserSchema.methods.publicJSON = function publicJSON() {
  const {
    _doc: { hash, salt, ...personalInfo },
  } = this;
  return { ...personalInfo };
};
const User = mongoose.model<UserDoc>('User', UserSchema);

export default User;
