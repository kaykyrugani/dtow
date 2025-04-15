import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados
  await prisma.refreshToken.deleteMany();
  await prisma.pedidoItem.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.avaliacao.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.cupom.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.usuario.deleteMany();

  // Criar usuários
  const adminSenha = await hash('admin123', 10);
  const clienteSenha = await hash('cliente123', 10);

  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@onlywave.com',
      senha: adminSenha,
      cpf: '12345678900',
      tipoUsuario: 'ADMIN',
    },
  });

  const cliente = await prisma.usuario.create({
    data: {
      nome: 'Cliente Teste',
      email: 'cliente@teste.com',
      senha: clienteSenha,
      cpf: '98765432100',
      tipoUsuario: 'CLIENTE',
    },
  });

  // Criar endereços
  await prisma.endereco.create({
    data: {
      rua: 'Rua Teste',
      numero: '123',
      complemento: 'Apto 45',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567',
      usuarioId: cliente.id,
    },
  });

  // Criar produtos
  const produto = await prisma.produto.create({
    data: {
      nome: 'Camiseta Básica',
      descricao: 'Camiseta básica de algodão',
      preco: 99.90,
      marca: 'OnlyWave',
      categoria: 'Vestuário',
      subcategoria: 'Camisetas',
      imagem: 'camiseta-basica.jpg',
      imagens: 'camiseta-basica-1.jpg,camiseta-basica-2.jpg',
      tamanhos: 'P,M,G,GG',
      estoque: 100,
    },
  });

  // Criar avaliações
  await prisma.avaliacao.create({
    data: {
      nota: 5,
      comentario: 'Produto excelente!',
      produtoId: produto.id,
      usuarioId: cliente.id,
    },
  });

  // Criar pedidos
  const pedido = await prisma.pedido.create({
    data: {
      status: 'PENDING',
      pagamento: 'CREDIT_CARD',
      valorTotal: 99.90,
      frete: 15.00,
      endereco: 'Rua Teste, 123 - Centro, São Paulo - SP',
      usuarioId: cliente.id,
    },
  });

  // Criar itens do pedido
  await prisma.pedidoItem.create({
    data: {
      quantidade: 1,
      preco: 99.90,
      tamanho: 'M',
      produtoId: produto.id,
      pedidoId: pedido.id,
    },
  });

  // Criar cupons
  await prisma.cupom.create({
    data: {
      codigo: 'WELCOME10',
      desconto: 10,
      tipo: 'percentual',
      valorMinimo: 100,
      expiracao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 