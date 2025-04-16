import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Criar usuário administrador
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@onlywave.com' },
    update: {},
    create: {
      email: 'admin@onlywave.com',
      nome: 'Administrador',
      senha: adminPassword,
      role: 'ADMIN',
      ativo: true,
    },
  });
  console.log('Usuário administrador criado:', admin.email);

  // Criar categorias básicas
  const categorias = [
    { nome: 'Eletrônicos', descricao: 'Produtos eletrônicos em geral' },
    { nome: 'Roupas', descricao: 'Vestuário para todas as idades' },
    { nome: 'Acessórios', descricao: 'Acessórios diversos' },
    { nome: 'Casa e Decoração', descricao: 'Itens para casa e decoração' },
    { nome: 'Esportes', descricao: 'Equipamentos e roupas esportivas' },
  ];

  for (const categoria of categorias) {
    const cat = await prisma.categoria.upsert({
      where: { nome: categoria.nome },
      update: {},
      create: categoria,
    });
    console.log('Categoria criada:', cat.nome);
  }

  // Criar configurações iniciais
  const configs = await prisma.configuracao.upsert({
    where: { chave: 'TAXA_PADRAO' },
    update: {},
    create: {
      chave: 'TAXA_PADRAO',
      valor: '2.99',
      descricao: 'Taxa padrão de processamento de pagamento',
    },
  });
  console.log('Configuração criada:', configs.chave);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 