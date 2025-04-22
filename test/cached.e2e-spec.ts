import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CachedController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/cached/:key (GET)', () => {
    const key = 'test-key';
    return request(app.getHttpServer())
      .get(`/cached/${key}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body.data).toContain(key);
      });
  });

  it('/cached/:key (DELETE)', () => {
    const key = 'test-key';
    return request(app.getHttpServer())
      .delete(`/cached/${key}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Cache invalidado com sucesso');
      });
  });

  it('should handle rate limiting', async () => {
    const key = 'test-key';
    const requests = Array(11).fill(null).map(() =>
      request(app.getHttpServer())
        .get(`/cached/${key}`)
        .expect(200)
    );

    const responses = await Promise.all(requests);
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status).toBe(429); // Too Many Requests
  });
}); 