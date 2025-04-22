import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authMiddleware } from '../middlewares/auth';
import { validarSchema } from '../middlewares/validator';
import { atualizarPerfilSchema, enderecoSchema } from '../schemas/usuarioSchemas';

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

const usuarioRouter = Router();

// Rotas protegidas
usuarioRouter.use(authMiddleware);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   get:
 *     summary: Obtém o perfil do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 */
usuarioRouter.get('/perfil', UsuarioController.obterPerfil);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   put:
 *     summary: Atualiza o perfil do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PerfilInput'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
usuarioRouter.put(
  '/perfil',
  validarSchema(atualizarPerfilSchema),
  UsuarioController.atualizarPerfil,
);

/**
 * @swagger
 * /api/usuarios/endereco:
 *   post:
 *     summary: Adiciona um novo endereço ao usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnderecoInput'
 *     responses:
 *       201:
 *         description: Endereço adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Endereco'
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
usuarioRouter.post('/endereco', validarSchema(enderecoSchema), UsuarioController.adicionarEndereco);

/**
 * @swagger
 * /api/usuarios/pedidos:
 *   get:
 *     summary: Lista os pedidos do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pedido'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Não autorizado
 */
usuarioRouter.get('/pedidos', UsuarioController.listarPedidos);

export { usuarioRouter };

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *         telefone:
 *           type: string
 *           description: Telefone do usuário
 *         tipoUsuario:
 *           type: string
 *           enum: [ADMIN, CLIENTE]
 *           description: Tipo do usuário
 *         enderecos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Endereco'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PerfilInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - cpf
 *         - telefone
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *         telefone:
 *           type: string
 *           description: Telefone do usuário
 *     Endereco:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do endereço
 *         rua:
 *           type: string
 *           description: Nome da rua
 *         numero:
 *           type: string
 *           description: Número do endereço
 *         complemento:
 *           type: string
 *           description: Complemento do endereço
 *         bairro:
 *           type: string
 *           description: Bairro
 *         cidade:
 *           type: string
 *           description: Cidade
 *         estado:
 *           type: string
 *           description: Estado (UF)
 *         cep:
 *           type: string
 *           description: CEP
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     EnderecoInput:
 *       type: object
 *       required:
 *         - rua
 *         - numero
 *         - bairro
 *         - cidade
 *         - estado
 *         - cep
 *       properties:
 *         rua:
 *           type: string
 *           description: Nome da rua
 *         numero:
 *           type: string
 *           description: Número do endereço
 *         complemento:
 *           type: string
 *           description: Complemento do endereço
 *         bairro:
 *           type: string
 *           description: Bairro
 *         cidade:
 *           type: string
 *           description: Cidade
 *         estado:
 *           type: string
 *           description: Estado (UF)
 *         cep:
 *           type: string
 *           description: CEP
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do pedido
 *         status:
 *           type: string
 *           enum: [PENDENTE, CONFIRMADO, ENVIADO, ENTREGUE, CANCELADO]
 *           description: Status do pedido
 *         valorTotal:
 *           type: number
 *           format: float
 *           description: Valor total do pedido
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemPedido'
 *         endereco:
 *           $ref: '#/components/schemas/Endereco'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ItemPedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do item do pedido
 *         quantidade:
 *           type: integer
 *           description: Quantidade do produto
 *         precoUnitario:
 *           type: number
 *           format: float
 *           description: Preço unitário do produto no momento da compra
 *         produto:
 *           $ref: '#/components/schemas/Produto'
 */
