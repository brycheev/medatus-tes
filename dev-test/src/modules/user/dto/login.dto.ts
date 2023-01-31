import { ILogin } from '../models/user.models';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailValid, IsPasswordValid } from './regular/regular-expressions';

export class LoginDto implements ILogin {
  @IsString()
  @IsNotEmpty()
  @Matches(IsEmailValid, {
    message: 'Invalid email',
  })
  @ApiProperty()
  public username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(IsPasswordValid, {
    message: 'password too weak',
  })
  @ApiProperty()
  public password!: string;
}
