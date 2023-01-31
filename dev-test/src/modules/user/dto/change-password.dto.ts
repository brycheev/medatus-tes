import { IChangePassword } from '../models/user.models';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordValid } from './regular/regular-expressions';

export class ChangePasswordDto implements IChangePassword {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public oldPassword!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(IsPasswordValid, {
    message: 'password too weak',
  })
  @ApiProperty()
  public newPassword!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public sessionId!: string;
}
