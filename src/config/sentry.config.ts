import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { registerAs } from '@nestjs/config';

export const sentryConfig = registerAs('sentry', () => ({
  dsn: process.env.SENTRY_DSN || '',
  enabled: process.env.NODE_ENV === 'production',
}));

export const initSentry = () => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [new ProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        if (process.env.NODE_ENV !== 'production') {
          return null;
        }
        return event;
      },
    });
  }
};
