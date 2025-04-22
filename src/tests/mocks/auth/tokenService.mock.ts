import { vi } from 'vitest';
import { TokenService } from '../../../services/TokenService';

export const createMockTokenService = () =>
  ({
    generateAccessToken: vi.fn().mockReturnValue('mock_access_token'),
    generateRefreshToken: vi.fn().mockResolvedValue('mock_refresh_token'),
    verifyAccessToken: vi.fn().mockReturnValue('user_id'),
    verifyRefreshToken: vi.fn().mockResolvedValue('user_id'),
    generatePasswordResetToken: vi.fn().mockResolvedValue('mock_reset_token'),
    verifyPasswordResetToken: vi.fn().mockResolvedValue('user_id'),
    revokeRefreshToken: vi.fn().mockResolvedValue(undefined),
    revokePasswordResetToken: vi.fn().mockResolvedValue(undefined),
  }) as unknown as TokenService;
