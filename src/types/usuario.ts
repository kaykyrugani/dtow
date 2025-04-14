export enum TipoUsuario {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE'
}

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  cpf: string;
  tipoUsuario: TipoUsuario;
  senha?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsuarioSemSenha extends Omit<Usuario, 'senha'> {} 