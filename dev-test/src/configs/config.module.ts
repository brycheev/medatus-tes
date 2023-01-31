import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { AppConfig } from './app.config';
import { ConfigService } from './config.service';
import { MongoConfig } from './mongo.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [NestConfig.ConfigService, ConfigService, AppConfig, MongoConfig],
  exports: [AppConfig, ConfigService, MongoConfig],
})
export class ConfigModule {}
