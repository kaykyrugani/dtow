export interface CreateProductDTO {
  nome: string;
  descricao: string;
  preco: number;
  desconto?: number;
  marca: string;
  categoria: string;
  subcategoria?: string;
  imagem: string;
  imagens: string;
  tamanhos: string;
  estoque: number;
  ativo?: boolean;
}

export interface UpdateProductDTO {
  nome?: string;
  descricao?: string;
  preco?: number;
  desconto?: number;
  marca?: string;
  categoria?: string;
  subcategoria?: string;
  imagem?: string;
  imagens?: string;
  tamanhos?: string;
  estoque?: number;
  ativo?: boolean;
}

export interface ProductResponseDTO {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  desconto: number | null;
  marca: string;
  categoria: string;
  subcategoria: string;
  imagem: string;
  imagens: string;
  tamanhos: string;
  estoque: number;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}
