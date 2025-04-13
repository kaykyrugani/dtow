import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';
import { validate } from '../utils/validator';
import { z } from 'zod';

const usuarioSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
  tipoUsuario: z.enum(['cliente', 'admin']).default('cliente')
});

export class UsuarioController {
  static async criar(req: Request, res: Response) {
    const dados = await validate(usuarioSchema, req.body);
    const usuario = await UsuarioService.criar(dados);
    return res.status(201).json(usuario);
  }

  static async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const dados = await validate(usuarioSchema.partial(), req.body);
    const usuario = await UsuarioService.atualizar(Number(id), dados);
    return res.json(usuario);
  }

  static async deletar(req: Request, res: Response) {
    const { id } = req.params;
    await UsuarioService.deletar(Number(id));
    return res.status(204).send();
  }

  static async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await UsuarioService.buscarPorId(Number(id));
    return res.json(usuario);
  }

  static async listar(req: Request, res: Response) {
    const { page, limit, sort, order } = req.query;
    const usuarios = await UsuarioService.listar({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sort: String(sort) || 'id',
      order: (order as 'asc' | 'desc') || 'asc'
    });
    return res.json(usuarios);
  }
} 