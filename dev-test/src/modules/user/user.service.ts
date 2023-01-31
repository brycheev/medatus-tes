import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  IChangePassword,
  ICreateUser,
  IGetUser,
  IRegister,
  IUserDocument,
} from './models/user.models';
import * as bcrypt from 'bcrypt';
import { SessionService } from '../session/session.service';
import { Types } from 'mongoose';
import { CRYPTO_ROUNDS } from './constants';

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository;
  private readonly sessionService: SessionService;

  constructor(userRepository: UserRepository, sessionService: SessionService) {
    this.userRepository = userRepository;
    this.sessionService = sessionService;
  }

  async create(payload: ICreateUser): Promise<IUserDocument> {
    const user = await this.userRepository.create(payload);

    return user.toObject();
  }

  async findOne(query: IGetUser): Promise<IUserDocument> {
    const user = await this.userRepository.findOne(query);

    return user.toObject();
  }

  async validate(username: string, pass: string) {
    const user = await this.findOne({
      username,
    });

    if (!user) return null;

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(payload: Omit<IUserDocument, 'password'>) {
    const sessionId = this.sessionService.create(payload._id.toString());
    return sessionId;
  }

  async register(payload: IRegister) {
    const existedUser = await this.findOne({
      username: payload.username,
    });

    if (existedUser) {
      throw new BadRequestException('User already exist');
    }

    payload.password = await bcrypt.hash(payload.password, CRYPTO_ROUNDS);

    const user = await this.create(payload);

    const { password, ...result } = user;

    return result;
  }

  async changePassword(payload: IChangePassword, userId: Types.ObjectId) {
    const user = await this.findOne({
      _id: userId,
    });

    if (user && (await bcrypt.compare(payload.oldPassword, user.password))) {
      payload.newPassword = await bcrypt.hash(
        payload.newPassword,
        CRYPTO_ROUNDS,
      );
      payload.id = userId;

      await this.userRepository.changePassword(payload);
      this.sessionService.delete(payload.sessionId);
    } else {
      throw new BadRequestException('Incorrect old password');
    }
  }
}
