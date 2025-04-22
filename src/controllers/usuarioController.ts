import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';
import { validate } from '../utils/validator';
import { z } from 'zod';
import { container } from 'tsyringe';
import { CpfValidatorService } from '../modules/validation/services/CpfValidatorService';
import { PrismaClient } from '@prisma/client';
import { PaginationParams } from '../types/pagination';

// Função personalizada para validar CPF
const validarCpfCustomizado = (cpf: string) => {
  const cpfValidatorService = container.resolve(CpfValidatorService);
  return cpfValidatorService.isCpfValido(cpf);
};

const usuarioSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve conter 11 dígitos')
    .refine(validarCpfCustomizado, {
      message: 'CPF inválido',
    }),
  tipoUsuario: z.enum(['cliente', 'admin']).default('cliente'),
});

export class UsuarioController {
  private static usuarioService = new UsuarioService(new PrismaClient());

  static async criar(req: Request, res: Response) {
    const dados = await validate(usuarioSchema, req.body);
    const usuario = await UsuarioController.usuarioService.criar(dados);
    return res.status(201).json(usuario);
  }

  static async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const dados = await validate(usuarioSchema.partial(), req.body);
    const usuario = await UsuarioController.usuarioService.atualizar(Number(id), dados);
    return res.json(usuario);
  }

  static async deletar(req: Request, res: Response) {
    const { id } = req.params;
    await UsuarioController.usuarioService.deletar(Number(id));
    return res.status(204).send();
  }

  static async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await UsuarioController.usuarioService.buscarPorId(Number(id));
    return res.json(usuario);
  }

  static async listar(req: Request, res: Response) {
    const { page, limit, sort, order } = req.query;

    const params: PaginationParams = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    };

    if (sort && order) {
      params.orderBy = {
        [String(sort)]: order as 'asc' | 'desc',
      };
    }

    const usuarios = await UsuarioController.usuarioService.listar(params);
    return res.json(usuarios);
  }
}
