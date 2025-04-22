import { injectable } from 'tsyringe';
import { Prisma, Usuario } from '@prisma/client';
import { BaseRepository } from './BaseRepository';

@injectable()
export class UsuarioRepository extends BaseRepository<Usuario> {
  protected modelName = 'usuario';

  async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await this.prisma.usuario.findUnique({
        where: { email },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByEmailWithPassword(email: string): Promise<Usuario | null> {
    try {
      return await this.prisma.usuario.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          nome: true,
          senha: true,
          tipoUsuario: true,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
