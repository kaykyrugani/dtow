import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { ZodError } from 'zod';
import { RequestHandler } from 'express';

export class AuthController {
  static cadastrar: RequestHandler = async (req, res) => {
    try {
      const { usuario, token } = await AuthService.cadastrar(req.body);
      return res.status(201).json({ usuario, token });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          erro: 'Dados inválidos',
          detalhes: error.errors
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  static login: RequestHandler = async (req, res) => {
    try {
      const resultado = await AuthService.login(req.body);
      return res.json(resultado);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          erro: 'Dados inválidos',
          detalhes: error.errors
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  static recuperarSenha: RequestHandler = async (req, res) => {
    try {
      const { email } = req.body;
      const token = await AuthService.gerarTokenRecuperacao(email);
      
      // Em produção, você enviaria o token por email
      // Por enquanto, retornamos o token diretamente
      return res.json({ 
        mensagem: 'Se o email existir, você receberá as instruções de recuperação',
        token // Remover em produção
      });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

  static alterarSenha: RequestHandler = async (req, res) => {
    try {
      const { token, novaSenha } = req.body;
      await AuthService.alterarSenha(token, novaSenha);
      return res.json({ mensagem: 'Senha alterada com sucesso' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };
} 