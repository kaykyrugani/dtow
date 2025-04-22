import { AppError } from '../../utils/AppError';

export const expectAppError = async (promise: Promise<any>, code: string, status: number) => {
  await expect(promise).rejects.toThrow(new AppError(code, status));
};

export const expectSuccess = async <T>(promise: Promise<T>, expectedData: Partial<T>) => {
  const result = await promise;
  expect(result).toMatchObject(expectedData);
  return result;
};
