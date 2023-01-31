import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { sessions } from './session';

@Injectable()
export class SessionService {
  private generateSessionId(): string {
    const buffer = crypto.randomBytes(16);

    return buffer.toString('hex');
  }

  public create(data: string): string {
    const sessionId = this.generateSessionId();

    sessions.set(sessionId, data);
    return sessionId;
  }

  public get(sessionId: string): string {
    return sessions.get(sessionId);
  }

  public delete(sessionId: string): void {
    sessions.delete(sessionId);
  }
}
