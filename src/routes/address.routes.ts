import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateSchema } from '../middlewares/validateSchema';
import { createAddressSchema } from '../schemas/address.schema';

const addressRouter = Router();

// Todas as rotas requerem autenticação
addressRouter.use(authMiddleware);

// Criar novo endereço
addressRouter.post(
  '/',
  validateSchema(createAddressSchema),
  AddressController.createAddress
);

// Listar endereços do usuário
addressRouter.get('/', AddressController.listAddresses);

// Atualizar endereço
addressRouter.put(
  '/:id',
  validateSchema(createAddressSchema),
  AddressController.updateAddress
);

// Deletar endereço
addressRouter.delete('/:id', AddressController.deleteAddress);

// Definir endereço como principal
addressRouter.patch(
  '/:id/primary',
  AddressController.setPrimaryAddress
);

export { addressRouter }; 