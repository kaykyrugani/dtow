const { AuthService } = require('../services/authService');
const { PasswordValidator } = require('../utils/passwordValidator');

// Mock do Prisma
const mockUsuario = {
  create: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn()
};

jest.mock('../generated/prisma', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    usuario: mockUsuario
  }))
}));

describe('AuthService - Cadastro de Usuário', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Teste de cadastro com dados válidos
  test('deve cadastrar um usuário com dados válidos', async () => {
    const dadosCadastro = {
      nome: 'João Silva',
      email: 'joao@example.com',
      cpf: '12345678901',
      senha: 'Senha@Forte123',
      tipoUsuario: 'cliente'
    };

    // Mock do findFirst (verificação de usuário existente)
    mockUsuario.findFirst.mockResolvedValue(null);

    // Mock do create (criação do usuário)
    const usuarioCriado = {
      id: 1,
      nome: dadosCadastro.nome,
      email: dadosCadastro.email,
      tipoUsuario: dadosCadastro.tipoUsuario,
      criadoEm: new Date()
    };
    mockUsuario.create.mockResolvedValue(usuarioCriado);

    const resultado = await AuthService.cadastrar(dadosCadastro);

    expect(resultado).toHaveProperty('usuario');
    expect(resultado).toHaveProperty('token');
    expect(resultado.usuario).toHaveProperty('id');
    expect(resultado.usuario.email).toBe(dadosCadastro.email);
    expect(resultado.usuario.tipoUsuario).toBe(dadosCadastro.tipoUsuario);
  });

  // 2. Teste de email duplicado
  test('deve rejeitar cadastro com email duplicado', async () => {
    const dadosCadastro = {
      nome: 'João Silva',
      email: 'existente@example.com',
      cpf: '12345678901',
      senha: 'Senha@Forte123',
      tipoUsuario: 'cliente'
    };

    // Mock usuário existente
    mockUsuario.findFirst.mockResolvedValue({
      id: 1,
      email: dadosCadastro.email,
      cpf: '98765432101'
    });

    await expect(AuthService.cadastrar(dadosCadastro))
      .rejects
      .toThrow('Email ou CPF já cadastrado');
  });

  // 3. Teste de CPF duplicado
  test('deve rejeitar cadastro com CPF duplicado', async () => {
    const dadosCadastro = {
      nome: 'João Silva',
      email: 'novo@example.com',
      cpf: '12345678901',
      senha: 'Senha@Forte123',
      tipoUsuario: 'cliente'
    };

    // Mock usuário existente com mesmo CPF
    mockUsuario.findFirst.mockResolvedValue({
      id: 1,
      email: 'outro@example.com',
      cpf: dadosCadastro.cpf
    });

    await expect(AuthService.cadastrar(dadosCadastro))
      .rejects
      .toThrow('Email ou CPF já cadastrado');
  });

  // 4. Teste de validação de email
  test('deve rejeitar email com formato inválido', async () => {
    const dadosCadastro = {
      nome: 'João Silva',
      email: 'emailinvalido',
      cpf: '12345678901',
      senha: 'Senha@Forte123',
      tipoUsuario: 'cliente'
    };

    await expect(AuthService.cadastrar(dadosCadastro))
      .rejects
      .toThrow();
  });

  // 5. Teste de validação de senha
  test('deve validar força da senha', async () => {
    const dadosCadastro = {
      nome: 'João Silva',
      email: 'joao@example.com',
      cpf: '12345678901',
      senha: '123', // senha fraca
      tipoUsuario: 'cliente'
    };

    const senhaValida = PasswordValidator.isStrongEnough(dadosCadastro.senha);
    expect(senhaValida).toBe(false);

    await expect(AuthService.cadastrar(dadosCadastro))
      .rejects
      .toThrow();
  });
}); 