export type PrismaError = {
  code: string;
  meta?: Record<string, any>;
  message: string;
  clientVersion: string;
};

export function createPrismaError(code: string, meta?: Record<string, any>): PrismaError {
  return {
    code,
    meta,
    message: `Prisma error ${code}`,
    clientVersion: '4.0.0',
  };
}
