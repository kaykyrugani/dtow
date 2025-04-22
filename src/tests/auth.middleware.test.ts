import { describe, it, expect, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/auth.middleware';
import { AppError } from '../utils/AppError';
import { ErrorMessages } from '../utils/errorConstants';
import { SECURITY } from '../config/constants';
import { createMockRequest, createMockResponse, mockNext, mockJwtPayload } from './setup';

describe('AuthMiddleware', () => {
  const validToken = jwt.sign(mockJwtPayload, SECURITY.JWT_SECRET);
  const expiredToken = jwt.sign(mockJwtPayload, SECURITY.JWT_SECRET, { expiresIn: '0s' });

  beforeEach(() => {
    mockNext.mockClear();
  });

  describe('Token Validation', () => {
    it('deve passar quando o token é válido', async () => {
      const req = createMockRequest({
        headers: { authorization: `Bearer ${validToken}` },
      });
      const res = createMockResponse();

      await authMiddleware()(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(req.user).toEqual(
        expect.objectContaining({
          userId: mockJwtPayload.userId,
          email: mockJwtPayload.email,
        }),
      );
    });

    it('deve retornar erro quando o token está ausente', async () => {
      const req = createMockRequest();
      const res = createMockResponse();

      await authMiddleware()(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(mockNext.mock.calls[0][0].message).toBe(ErrorMessages.MISSING_TOKEN);
    });

    it('deve retornar erro quando o token está expirado', async () => {
      const req = createMockRequest({
        headers: { authorization: `Bearer ${expiredToken}` },
      });
      const res = createMockResponse();

      await authMiddleware()(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(mockNext.mock.calls[0][0].message).toBe(ErrorMessages.INVALID_TOKEN);
    });

    it('deve retornar erro quando o token é inválido', async () => {
      const req = createMockRequest({
        headers: { authorization: 'Bearer invalid.token.here' },
      });
      const res = createMockResponse();

      await authMiddleware()(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(mockNext.mock.calls[0][0].message).toBe(ErrorMessages.INVALID_TOKEN);
    });
  });

  describe('Role Validation', () => {
    it('deve passar quando o usuário tem a role necessária', async () => {
      const req = createMockRequest({
        headers: { authorization: `Bearer ${validToken}` },
      });
      const res = createMockResponse();

      await authMiddleware(['admin'])(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
    });

    it('deve retornar erro quando o usuário não tem a role necessária', async () => {
      const req = createMockRequest({
        headers: { authorization: `Bearer ${validToken}` },
      });
      const res = createMockResponse();

      await authMiddleware(['superadmin'])(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      expect(mockNext.mock.calls[0][0].message).toBe(ErrorMessages.INSUFFICIENT_PERMISSIONS);
    });
  });
});
