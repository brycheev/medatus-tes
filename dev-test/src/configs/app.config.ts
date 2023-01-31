import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class AppConfig {
  public readonly port: number;
  public readonly isProduction: boolean;

  constructor(configService: ConfigService) {
    this.port = configService.getNumber('APP_PORT');
    this.isProduction = configService.getBoolean('APP_PRODUCTION');
  }
}
