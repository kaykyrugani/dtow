import { PrismaClient, OrderStatus } from '@prisma/client';
import { AppError } from '../../../utils/AppError';
import { ERROR_CODES } from '../../../constants/errorCodes';

export class OrderService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userId: string, items: { productId: string; quantity: number }[]) {
    // Verificar se o usuário existe
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', ERROR_CODES.NOT_FOUND);
    }

    // Verificar se os produtos existem e calcular o total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await this.prisma.produto.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new AppError(`Produto ${item.productId} não encontrado`, ERROR_CODES.NOT_FOUND);
      }

      if (product.quantidade < item.quantity) {
        throw new AppError(
          `Quantidade insuficiente para o produto ${product.nome}`,
          ERROR_CODES.VALIDATION_ERROR,
        );
      }

      total += product.preco * item.quantity;
      orderItems.push({
        produtoId: product.id,
        quantidade: item.quantity,
        precoUnitario: product.preco,
      });
    }

    // Criar o pedido
    const order = await this.prisma.pedido.create({
      data: {
        usuarioId: userId,
        status: OrderStatus.PENDING,
        total,
        itens: {
          create: orderItems,
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    // Atualizar o estoque dos produtos
    for (const item of items) {
      await this.prisma.produto.update({
        where: { id: item.productId },
        data: {
          quantidade: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  }

  async findById(id: string) {
    const order = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError('Pedido não encontrado', ERROR_CODES.NOT_FOUND);
    }

    return order;
  }

  async findByUserId(userId: string) {
    const orders = await this.prisma.pedido.findMany({
      where: { usuarioId: userId },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.pedido.findUnique({
      where: { id },
    });

    if (!order) {
      throw new AppError('Pedido não encontrado', ERROR_CODES.NOT_FOUND);
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new AppError(
        'Não é possível atualizar o status de um pedido cancelado',
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    const updatedOrder = await this.prisma.pedido.update({
      where: { id },
      data: { status },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    return updatedOrder;
  }

  async cancel(id: string) {
    const order = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: true,
      },
    });

    if (!order) {
      throw new AppError('Pedido não encontrado', ERROR_CODES.NOT_FOUND);
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new AppError('Pedido já está cancelado', ERROR_CODES.VALIDATION_ERROR);
    }

    if (order.status === OrderStatus.DELIVERED) {
      throw new AppError(
        'Não é possível cancelar um pedido já entregue',
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    // Restaurar o estoque dos produtos
    for (const item of order.itens) {
      await this.prisma.produto.update({
        where: { id: item.produtoId },
        data: {
          quantidade: {
            increment: item.quantidade,
          },
        },
      });
    }

    const cancelledOrder = await this.prisma.pedido.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    return cancelledOrder;
  }
}
