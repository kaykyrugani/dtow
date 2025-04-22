import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Fluxo de Usuário (Integração)', () => {
  beforeAll(async () => {
    // Limpa o banco de dados antes dos testes
    await prisma.pedidoItem.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.endereco.deleteMany();
    await prisma.usuario.deleteMany();
  });

  it('deve completar o fluxo de cadastro, login e acesso a dados protegidos', async () => {
    // 1. Cadastro de usuário
    const dadosCadastro = {
      nome: 'Carlos Teste',
      email: 'carlos.teste@email.com',
      senha: 'Senha@123',
      cpf: '12345678900',
    };

    const resCadastro = await request(app).post('/auth/cadastro').send(dadosCadastro);

    expect(resCadastro.status).toBe(201);
    expect(resCadastro.body).toHaveProperty('id');

    // 2. Login
    const resLogin = await request(app).post('/auth/login').send({
      email: dadosCadastro.email,
      senha: dadosCadastro.senha,
    });

    expect(resLogin.status).toBe(200);
    expect(resLogin.body).toHaveProperty('token');
    const token = resLogin.body.token;

    // 3. Acesso a rota protegida (perfil)
    const resPerfil = await request(app)
      .get('/usuario/perfil')
      .set('Authorization', `Bearer ${token}`);

    expect(resPerfil.status).toBe(200);
    expect(resPerfil.body).toHaveProperty('email', dadosCadastro.email);

    // 4. Criar um produto (rota protegida)
    const resProduto = await request(app)
      .post('/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Produto Teste',
        descricao: 'Descrição do produto teste',
        preco: 99.99,
        estoque: 10,
      });

    expect(resProduto.status).toBe(201);
    expect(resProduto.body).toHaveProperty('id');

    // 5. Criar um pedido
    const resPedido = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        produtos: [
          {
            produtoId: resProduto.body.id,
            quantidade: 1,
          },
        ],
      });

    expect(resPedido.status).toBe(201);
    expect(resPedido.body).toHaveProperty('id');
  });
});
