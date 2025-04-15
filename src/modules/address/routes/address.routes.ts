import { Router } from 'express';
import { AddressController } from '../controllers/AddressController';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateSchema } from '../../../middlewares/validateSchema';
import { enderecoSchema, consultaCepSchema } from '../dtos/EnderecoDTO';

const addressRouter = Router();

// Rota pública para consulta de CEP
addressRouter.get(
  '/cep/:cep',
  validateSchema(consultaCepSchema),
  AddressController.consultarCep
);

// Rotas protegidas
addressRouter.use(authMiddleware());

// Criar endereço
addressRouter.post(
  '/',
  validateSchema(enderecoSchema),
  AddressController.criar
);

// Atualizar endereço
addressRouter.put(
  '/:id',
  validateSchema(enderecoSchema),
  AddressController.atualizar
);

// Deletar endereço
addressRouter.delete('/:id', AddressController.deletar);

// Buscar endereço por ID
addressRouter.get('/:id', AddressController.buscarPorId);

// Listar endereços por usuário
addressRouter.get('/usuario/:usuarioId', AddressController.listarPorUsuario);

export { addressRouter }; 