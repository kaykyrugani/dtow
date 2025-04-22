import { AuditService, AuditAction } from '../AuditService';
import { PrismaClient } from '@prisma/client';
import { LoggingService } from '../LoggingService';

jest.mock('@prisma/client');
jest.mock('../LoggingService');

describe('AuditService', () => {
  let auditService: AuditService;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockLoggingService: jest.Mocked<LoggingService>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    mockLoggingService = LoggingService.getInstance() as jest.Mocked<LoggingService>;
    auditService = new AuditService(mockPrisma, mockLoggingService);
  });

  describe('log', () => {
    const mockAuditData = {
      action: AuditAction.PAYMENT_CREATED,
      entityId: '123456789',
      entityType: 'payment',
      details: {
        amount: 100,
        status: 'approved',
      },
    };

    it('deve registrar log de auditoria com sucesso', async () => {
      mockPrisma.auditLog.create.mockResolvedValue({} as any);

      await auditService.log(mockAuditData);

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: {
          action: mockAuditData.action,
          entityId: mockAuditData.entityId,
          entityType: mockAuditData.entityType,
          details: mockAuditData.details,
          timestamp: expect.any(Date),
        },
      });
      expect(mockLoggingService.info).toHaveBeenCalled();
    });

    it('deve registrar erro quando falha ao criar log', async () => {
      const error = new Error('Database error');
      mockPrisma.auditLog.create.mockRejectedValue(error);

      await auditService.log(mockAuditData);

      expect(mockLoggingService.error).toHaveBeenCalledWith(
        'Erro ao registrar log de auditoria',
        expect.objectContaining({
          error,
          auditData: mockAuditData,
        }),
      );
    });
  });

  describe('getAuditLogs', () => {
    const mockFilters = {
      entityId: '123456789',
      entityType: 'payment',
      startDate: new Date(),
      endDate: new Date(),
    };

    it('deve retornar logs de auditoria filtrados', async () => {
      const mockLogs = [{ id: 1, action: AuditAction.PAYMENT_CREATED }];
      mockPrisma.auditLog.findMany.mockResolvedValue(mockLogs as any[]);

      const result = await auditService.getAuditLogs(mockFilters);

      expect(result).toEqual(mockLogs);
      expect(mockPrisma.auditLog.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          entityId: mockFilters.entityId,
          entityType: mockFilters.entityType,
          timestamp: {
            gte: mockFilters.startDate,
            lte: mockFilters.endDate,
          },
        }),
        orderBy: {
          timestamp: 'desc',
        },
      });
    });

    it('deve retornar erro quando falha ao buscar logs', async () => {
      const error = new Error('Database error');
      mockPrisma.auditLog.findMany.mockRejectedValue(error);

      await expect(auditService.getAuditLogs(mockFilters)).rejects.toThrow(error);
      expect(mockLoggingService.error).toHaveBeenCalled();
    });
  });
});
