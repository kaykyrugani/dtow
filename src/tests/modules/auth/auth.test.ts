import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../../../modules/admin/services/auth.service';
import { prisma } from '../../../config/database';
import { hash } from 'bcryptjs';

describe('Auth Module', () => {
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService();
    await prisma.user.deleteMany();
  });

  describe('Login', () => {
    it('should authenticate user with valid credentials', async () => {
      const password = await hash('validPassword123', 10);
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password,
          name: 'Test User'
        }
      });

      const result = await authService.login({
        email: 'test@example.com',
        password: 'validPassword123'
      });

      expect(result).toHaveProperty('token');
      expect(result.user).toHaveProperty('id', user.id);
    });

    it('should not authenticate with invalid credentials', async () => {
      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongPassword'
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('2FA', () => {
    it('should generate 2FA secret for user', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: await hash('password123', 10),
          name: 'Test User'
        }
      });

      const result = await authService.generate2FASecret(user.id);
      expect(result).toHaveProperty('secret');
      expect(result).toHaveProperty('qrCode');
    });
  });
}); 