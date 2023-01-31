import { Document, Types } from 'mongoose';

export interface IGetUser {
  _id?: Types.ObjectId;
  username?: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  password: string;
}

export interface IChangePassword {
  id?: Types.ObjectId;
  oldPassword: string;
  newPassword: string;
  sessionId: string;
}

export interface ICreateUser {
  username: string;
  password: string;
}

export interface IUserSchema {
  username: string;
  password: string;
}

export interface IUserDocument extends IUserSchema, Document {}
