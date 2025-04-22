import metricsConfig from './metrics.config';

describe('metricsConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return default values when environment variables are not set', () => {
    const config = metricsConfig();
    expect(config).toEqual({
      enabled: false,
      port: 9090,
    });
  });

  it('should return correct values when environment variables are set', () => {
    process.env.METRICS_ENABLED = 'true';
    process.env.METRICS_PORT = '8080';

    const config = metricsConfig();
    expect(config).toEqual({
      enabled: true,
      port: 8080,
    });
  });

  it('should handle invalid port value', () => {
    process.env.METRICS_ENABLED = 'true';
    process.env.METRICS_PORT = 'invalid';

    const config = metricsConfig();
    expect(config).toEqual({
      enabled: true,
      port: 9090,
    });
  });
});
