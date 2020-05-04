import crypto = require('crypto');
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const AccountSchemaDefinition: mongoose.SchemaDefinition = {
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is valid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  hash: String,
  salt: String,
};

const getHash = (password: string, salt: string) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
};

export const getAccountSchema = (extra?: mongoose.SchemaDefinition) => {
  const schema = new mongoose.Schema(AccountSchemaDefinition);

  schema.plugin(uniqueValidator, { message: 'is already taken.' });

  schema.methods.validPassword = function (password: string) {
    const hash = getHash(password, this.salt);
    return this.hash === hash;
  };
  schema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = getHash(password, this.salt);
  };

  schema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: this._id,
        username: this.username,
        exp: exp.getTime() / 1000,
      },
      config.secret
    );
  };

  schema.methods.toAuthJSON = function () {
    const { username, email } = this;
    return {
      username,
      email,
      token: this.generateJWT(),
    };
  };

  if (extra) {
    schema.add(extra);
  }
  return schema;
};

export interface AccountDoc extends mongoose.Document {
  username: string;
  email: string;
  hash: string;
  salt: string;

  validPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  generateJWT: () => string;
  toAuthJSON: () => any;
}
