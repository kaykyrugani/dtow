import { Router } from 'express'
import { AuthController } from '../controllers/authController'
import { validarSchema } from '../middlewares/validator'
import { cadastroSchema, loginSchema, recuperacaoSenhaSchema, alteracaoSenhaSchema } from '../schemas/authSchemas'

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação de usuários
 */

const authRouter = Router()

/**
 * @swagger
 * /api/auth/cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - cpf
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário (mínimo 6 caracteres)
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *               telefone:
 *                 type: string
 *                 description: Telefone do usuário
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Email ou CPF já cadastrado
 */
authRouter.post('/cadastro', validarSchema(cadastroSchema), AuthController.cadastrar)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
authRouter.post('/login', validarSchema(loginSchema), AuthController.login)

/**
 * @swagger
 * /api/auth/recuperar-senha:
 *   post:
 *     tags: [Autenticação]
 *     summary: Solicita recuperação de senha
 *     description: Envia um email com token para recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email de recuperação enviado com sucesso
 *       400:
 *         description: Email inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
authRouter.post('/recuperar-senha', validarSchema(recuperacaoSenhaSchema), AuthController.recuperarSenha)

/**
 * @swagger
 * /api/auth/alterar-senha:
 *   post:
 *     tags: [Autenticação]
 *     summary: Altera a senha do usuário
 *     description: Altera a senha do usuário usando o token de recuperação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Token inválido ou senha muito curta
 *       404:
 *         description: Token não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
authRouter.post('/alterar-senha', validarSchema(alteracaoSenhaSchema), AuthController.alterarSenha)

export { authRouter } 