import { PrometheusModuleOptions } from '@nestjs/prometheus';

export const prometheusConfig: PrometheusModuleOptions = {
  defaultMetrics: {
    enabled: true,
  },
  defaultLabels: {
    app: 'onlywave-backend',
  },
}; 