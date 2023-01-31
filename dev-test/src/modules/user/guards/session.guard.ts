import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { SessionService } from '../../session/session.service';

@Injectable()
export class SessionGuard implements CanActivate {
  private readonly sessionService: SessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const body = request.body;

    if (!body || !body.sessionId) {
      throw new BadRequestException('Invalid session');
    }

    const userId = this.sessionService.get(body.sessionId);
    if (!userId) {
      throw new UnauthorizedException('Invalid session');
    }

    request.userId = new Types.ObjectId(userId);
    return true;
  }
}
