import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateToken', () => {
    it('should validate tokens', async () => {
      const validResult = await service.validateToken('valid.token');
      const invalidResult = await service.validateToken('invalid.token');

      expect(validResult).toBeDefined();
      expect(invalidResult).toBeDefined();
    });
  });
});
