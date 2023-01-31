import { IRegister } from '../models/user.models';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailValid, IsPasswordValid } from './regular/regular-expressions';

export class RegisterDto implements IRegister {
  @IsString()
  @IsNotEmpty()
  @Matches(IsEmailValid, {
    message: 'Invalid email',
  })
  @ApiProperty()
  public username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  @Matches(IsPasswordValid, {
    message: 'Password too weak',
  })
  @ApiProperty()
  public password!: string;
}
