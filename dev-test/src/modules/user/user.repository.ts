import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IChangePassword,
  ICreateUser,
  IGetUser,
  IUserDocument,
} from './models/user.models';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaName } from './user.schema';

@Injectable()
export class UserRepository {
  private readonly userModel: Model<IUserDocument>;

  constructor(@InjectModel(SchemaName) userModel: Model<IUserDocument>) {
    this.userModel = userModel;
  }

  async create(payload: ICreateUser): Promise<IUserDocument> {
    const user = await this.userModel.create(payload);

    return user;
  }

  async findOne(query: IGetUser): Promise<IUserDocument | null> {
    const user = await this.userModel.findOne(query);

    return user;
  }

  async changePassword(payload: IChangePassword): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      { _id: payload.id },
      { $set: { password: payload.newPassword } },
    );
  }
}
