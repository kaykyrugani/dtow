import { OrderStatus, PaymentType } from '@prisma/client';

export interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface PaymentDTO {
  tipo: PaymentType;
}

export interface AddressDTO {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface CreateOrderDTO {
  items: OrderItemDTO[];
  pagamento: PaymentDTO;
  endereco: AddressDTO;
}

export interface OrderItemResponseDTO {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  preco: number;
  tamanho: string;
  produto: {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
  };
}

export interface OrderResponseDTO {
  id: number;
  usuarioId: number;
  status: OrderStatus;
  tipoPagamento: PaymentType;
  total: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
  itens: {
    id: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
    produto: {
      id: number;
      nome: string;
      descricao: string;
      preco: number;
      imagem: string;
    };
  }[];
  enderecoEntrega: {
    id: number;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}
