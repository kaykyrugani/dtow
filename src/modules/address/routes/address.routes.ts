import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateSchema } from '../../../middlewares/validateSchema.middleware';
import { createAddressSchema, updateAddressSchema } from '../dtos/address.dto';

const addressRouter = Router();
const addressController = new AddressController();

// Rota pública para busca de CEP
addressRouter.get('/search/:cep', addressController.searchByCep);

// Rotas protegidas
addressRouter.use(authMiddleware);

// Listar endereços do usuário
addressRouter.get('/', addressController.listByUserId);

// Criar novo endereço
addressRouter.post('/', validateSchema(createAddressSchema), addressController.create);

// Atualizar endereço
addressRouter.put('/:id', validateSchema(updateAddressSchema), addressController.update);

// Deletar endereço
addressRouter.delete('/:id', addressController.delete);

// Definir endereço como principal
addressRouter.patch('/:id/primary', addressController.setPrimary);

export { addressRouter };
