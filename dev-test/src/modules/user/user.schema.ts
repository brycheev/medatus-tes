import { Schema } from 'mongoose';
import { IUserDocument } from './models/user.models';
import { Types } from 'mongoose';

export const UserSchema = new Schema<IUserDocument>({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const SchemaName = 'User';
