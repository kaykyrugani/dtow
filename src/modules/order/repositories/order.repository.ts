import { PrismaClient, Pedido, OrderStatus } from '@prisma/client';
import { injectable } from 'tsyringe';
import { CreateOrderDTO } from '../dtos/order.dto';

@injectable()
export class OrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateOrderDTO, userId: number): Promise<Pedido> {
    return this.prisma.$transaction(async (prisma) => {
      // Criar o pedido
      const order = await prisma.pedido.create({
        data: {
          usuarioId: userId,
          cupomId: data.cupomId,
          status: 'PENDING',
          pagamento: data.pagamento,
          valorTotal: 0, // Será atualizado após criar os itens
          frete: 15.00, // Valor fixo por enquanto
          endereco: data.endereco,
          itens: {
            create: data.items.map(item => ({
              produtoId: item.productId,
              quantidade: item.quantity,
              preco: 0, // Será atualizado após buscar o produto
              tamanho: item.tamanho,
            })),
          },
        },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
          cupom: true,
        },
      });

      // Atualizar preços dos itens e total do pedido
      let total = 0;
      for (const item of order.itens) {
        const preco = item.produto.preco;
        const subtotal = preco * item.quantidade;
        
        await prisma.pedidoItem.update({
          where: { id: item.id },
          data: { preco },
        });

        total += subtotal;
      }

      // Aplicar desconto do cupom se existir
      if (order.cupom) {
        const desconto = order.cupom.tipo === 'percentual'
          ? (total * order.cupom.desconto) / 100
          : order.cupom.desconto;
        
        total -= desconto;
      }

      // Atualizar total do pedido
      return prisma.pedido.update({
        where: { id: order.id },
        data: { valorTotal: total },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
          cupom: true,
        },
      });
    });
  }

  async findById(id: number): Promise<Pedido | null> {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cupom: true,
      },
    });
  }

  async findByUserId(userId: number, page: number = 1, limit: number = 10): Promise<{ pedidos: Pedido[]; total: number }> {
    const skip = (page - 1) * limit;
    const [pedidos, total] = await Promise.all([
      this.prisma.pedido.findMany({
        where: { usuarioId: userId },
        skip,
        take: limit,
        orderBy: { data: 'desc' },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
          cupom: true,
        },
      }),
      this.prisma.pedido.count({
        where: { usuarioId: userId },
      }),
    ]);

    return { pedidos, total };
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Pedido> {
    return this.prisma.pedido.update({
      where: { id },
      data: { status },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cupom: true,
      },
    });
  }

  async cancel(id: number): Promise<Pedido> {
    return this.prisma.pedido.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        cupom: true,
      },
    });
  }
} 