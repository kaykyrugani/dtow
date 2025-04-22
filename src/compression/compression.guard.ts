import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';

@Injectable()
export class CompressionGuard implements CanActivate {
  private compressionMiddleware: any;

  constructor(private configService: ConfigService) {
    this.compressionMiddleware = compression({
      level: this.configService.get('COMPRESSION_LEVEL', 6),
      threshold: this.configService.get('COMPRESSION_THRESHOLD', 1024), // 1KB
    });
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return new Promise(resolve => {
      this.compressionMiddleware(request, response, () => {
        resolve(true);
      });
    });
  }
}
