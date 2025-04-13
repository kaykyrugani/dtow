import { Router } from 'express'
import { AuthController } from '../controllers/authController'
import { validarSchema } from '../middlewares/validator'
import { cadastroSchema, loginSchema, recuperarSenhaSchema, alterarSenhaSchema } from '../schemas/authSchemas'

const authRouter = Router()

authRouter.post('/cadastro', validarSchema(cadastroSchema), AuthController.cadastrar)
authRouter.post('/login', validarSchema(loginSchema), AuthController.login)
authRouter.post('/recuperar-senha', validarSchema(recuperarSenhaSchema), AuthController.recuperarSenha)
authRouter.post('/alterar-senha', validarSchema(alterarSenhaSchema), AuthController.alterarSenha)

export { authRouter } 