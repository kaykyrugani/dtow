import { registerAs } from '@nestjs/config';

export default registerAs('metrics', () => ({
  enabled: process.env.METRICS_ENABLED === 'true',
  port: parseInt(process.env.METRICS_PORT || '9090', 10),
}));
