import { vi } from 'vitest';
import { TokenService } from '../../services/TokenService';

export const createMockTokenService = () => ({
  generateAccessToken: vi.fn().mockReturnValue('mock-access-token'),
  generateRefreshToken: vi.fn().mockResolvedValue('mock-refresh-token'),
  generatePasswordResetToken: vi.fn().mockResolvedValue('mock-reset-token'),
  verifyAccessToken: vi.fn().mockReturnValue('mock-user-id'),
  verifyRefreshToken: vi.fn().mockResolvedValue('mock-user-id'),
  verifyPasswordResetToken: vi.fn().mockResolvedValue('mock-user-id'),
  revokeRefreshToken: vi.fn().mockResolvedValue(undefined),
  revokePasswordResetToken: vi.fn().mockResolvedValue(undefined),
  refreshAccessToken: vi.fn().mockResolvedValue({
    accessToken: 'mock-new-access-token',
    refreshToken: 'mock-new-refresh-token'
  })
}); 