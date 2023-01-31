import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, SchemaName } from './user.schema';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchemaName,
        schema: UserSchema,
      },
    ]),
    PassportModule,
    SessionModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, LocalStrategy],
  exports: [UserService],
})
export class UserModule {}
