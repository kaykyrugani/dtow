export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    items: T[];
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface EnderecoData {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface ProdutoData {
  nome: string;
  descricao: string;
  preco: number;
  desconto?: number;
  marca: string;
  categoria: string;
  subcategoria: string;
  imagem: string;
  imagens: string;
  tamanhos: string;
  estoque: number;
}

export interface PedidoItemData {
  produtoId: number;
  quantidade: number;
  tamanho: string;
  preco: number;
}

export interface PedidoData {
  enderecoId: number;
  itens: PedidoItemData[];
  cupomCodigo?: string;
} 