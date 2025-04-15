import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../utils/AppError';
import { CreateCouponInput, UpdateCouponInput, ListCouponsQuery } from '../schemas/coupon.schema';
import { HttpStatusCode } from '../../../constants/httpStatusCode';

export class CouponService {
  constructor(private prisma: PrismaClient) {}

  async create(userId: number, data: CreateCouponInput) {
    const existingCoupon = await this.prisma.cupom.findUnique({
      where: { codigo: data.codigo },
    });

    if (existingCoupon) {
      throw new AppError('Cupom já existe', HttpStatusCode.CONFLICT);
    }

    return this.prisma.cupom.create({
      data: {
        ...data,
        criadoPor: userId,
      },
    });
  }

  async findById(id: number) {
    const coupon = await this.prisma.cupom.findUnique({
      where: { id },
    });

    if (!coupon) {
      throw new AppError('Cupom não encontrado', HttpStatusCode.NOT_FOUND);
    }

    return coupon;
  }

  async findByCode(codigo: string) {
    const coupon = await this.prisma.cupom.findUnique({
      where: { codigo },
    });

    if (!coupon) {
      throw new AppError('Cupom não encontrado', HttpStatusCode.NOT_FOUND);
    }

    return coupon;
  }

  async findAll(query: ListCouponsQuery) {
    const { page, limit, sortBy, sortOrder, status, tipoDesconto, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Filtro por status
    if (status) {
      const now = new Date();
      if (status === 'ativo') {
        where.dataInicio = { lte: now };
        where.dataFim = { gte: now };
      } else if (status === 'inativo') {
        where.OR = [
          { dataInicio: { gt: now } },
          { dataFim: { lt: now } },
        ];
      } else if (status === 'expirado') {
        where.dataFim = { lt: now };
      }
    }

    // Filtro por tipo de desconto
    if (tipoDesconto) {
      where.tipoDesconto = tipoDesconto;
    }

    // Busca por texto
    if (search) {
      where.OR = [
        { codigo: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Ordenação
    const orderBy: any = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.dataCriacao = 'desc';
    }

    const [coupons, total] = await Promise.all([
      this.prisma.cupom.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.cupom.count({ where }),
    ]);

    return {
      data: coupons,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: number, userId: number, data: UpdateCouponInput) {
    const coupon = await this.findById(id);

    if (coupon.criadoPor !== userId) {
      throw new AppError('Não autorizado', HttpStatusCode.FORBIDDEN);
    }

    if (data.codigo) {
      const existingCoupon = await this.prisma.cupom.findUnique({
        where: { codigo: data.codigo },
      });

      if (existingCoupon && existingCoupon.id !== id) {
        throw new AppError('Código de cupom já existe', HttpStatusCode.CONFLICT);
      }
    }

    return this.prisma.cupom.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: number, userId: number, ativo: boolean) {
    const coupon = await this.findById(id);

    if (coupon.criadoPor !== userId) {
      throw new AppError('Não autorizado', HttpStatusCode.FORBIDDEN);
    }

    const updatedCoupon = await this.prisma.cupom.update({
      where: { id },
      data: { ativo },
    });

    return updatedCoupon;
  }

  async delete(id: number, userId: number) {
    const coupon = await this.findById(id);

    if (coupon.criadoPor !== userId) {
      throw new AppError('Não autorizado', HttpStatusCode.FORBIDDEN);
    }

    await this.prisma.cupom.delete({
      where: { id },
    });
  }

  async validate(codigo: string, valorTotal: number) {
    const coupon = await this.prisma.cupom.findUnique({
      where: { codigo },
    });

    if (!coupon) {
      throw new AppError('Cupom não encontrado', HttpStatusCode.NOT_FOUND);
    }

    const now = new Date();
    if (now < coupon.dataInicio || now > coupon.dataFim) {
      throw new AppError('Cupom fora do período de validade', HttpStatusCode.BAD_REQUEST);
    }

    if (coupon.quantidadeMaxima !== null && coupon.quantidadeMaxima <= 0) {
      throw new AppError('Cupom esgotado', HttpStatusCode.BAD_REQUEST);
    }

    if (coupon.valorMinimoCompra && valorTotal < coupon.valorMinimoCompra) {
      throw new AppError(
        `Valor mínimo de compra não atingido: R$ ${coupon.valorMinimoCompra}`,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const desconto = coupon.tipoDesconto === 'PERCENTUAL'
      ? (valorTotal * coupon.desconto) / 100
      : coupon.desconto;

    return {
      valido: true,
      desconto,
      valorFinal: valorTotal - desconto,
    };
  }
} 