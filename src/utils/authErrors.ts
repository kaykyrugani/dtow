import { AppError } from './AppError';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { HttpStatusCode } from '../constants/httpCodes';

export const throwInvalidCredentials = () => {
  throw new AppError(
    'INVALID_CREDENTIALS',
    HttpStatusCode.UNAUTHORIZED
  );
};

export const throwInvalidToken = () => {
  throw new AppError(
    'INVALID_TOKEN',
    HttpStatusCode.UNAUTHORIZED
  );
};

export const throwMissingToken = () => {
  throw new AppError(
    'MISSING_TOKEN',
    HttpStatusCode.UNAUTHORIZED
  );
}; 