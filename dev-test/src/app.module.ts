import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './configs/config.module';
import { MongoConfig } from './configs/mongo.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongoConfig,
    }),
    UserModule,
  ],
})
export class AppModule {}
