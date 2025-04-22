import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MetricsModule } from '../metrics/metrics.module';
import { LoggingModule } from '../../logging/logging.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    MetricsModule,
    LoggingModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
