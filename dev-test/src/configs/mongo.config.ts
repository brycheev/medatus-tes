import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from './config.service';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
  private readonly MONGO_DSN_NO_USER: string;
  private readonly MONGO_DB_NAME: string;
  private readonly MONGO_USER: string | undefined;
  private readonly MONGO_PASS: string | undefined;

  constructor(configService: ConfigService) {
    this.MONGO_DB_NAME = configService.getString('MONGO_NAME');
    this.MONGO_DSN_NO_USER = configService.getString('MONGO_DSN_NO_USER');
    this.MONGO_USER = configService.getString('MONGO_USER');
    this.MONGO_PASS = configService.getString('MONGO_PASS');
  }

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.MONGO_DSN_NO_USER,
      dbName: this.MONGO_DB_NAME,
      user: this.MONGO_USER,
      pass: this.MONGO_PASS,
      directConnection: true,
      keepAlive: true,
    };
  }
}
