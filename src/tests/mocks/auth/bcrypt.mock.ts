import { vi } from 'vitest';

export const mockBcrypt = {
  hash: vi.fn().mockImplementation((senha: string) => Promise.resolve(`hashed_${senha}`)),
  compare: vi.fn().mockImplementation((senha: string, hash: string) => {
    const expectedHash = `hashed_${senha}`;
    return Promise.resolve(hash === expectedHash);
  })
};

vi.mock('bcrypt', () => mockBcrypt); 