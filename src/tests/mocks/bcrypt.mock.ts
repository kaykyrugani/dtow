import { vi } from 'vitest';

export const mockBcrypt = {
  hash: vi.fn().mockImplementation((senha: string) => 
    Promise.resolve(`hashed_${senha}`)
  ),
  compare: vi.fn().mockImplementation((senha: string, hash: string) => 
    Promise.resolve(hash === `hashed_${senha}`)
  ),
  genSalt: vi.fn().mockResolvedValue('test_salt')
}; 