import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from './user.service';
import { SessionGuard } from './guards/session.guard';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    const user = await this.userService.register(payload);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() payload: LoginDto, @Req() req) {
    return this.userService.login(req.user);
  }

  @UseGuards(SessionGuard)
  @Post('change-password')
  async changePassword(@Body() payload: ChangePasswordDto, @Req() req) {
    return this.userService.changePassword(payload, req.userId);
  }
}
