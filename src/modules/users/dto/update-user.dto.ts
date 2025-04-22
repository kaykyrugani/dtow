import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
    required: false,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
    minLength: 6,
    required: false,
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Papel do usuário',
    example: 'user',
    enum: ['admin', 'user'],
    required: false,
  })
  @IsEnum(['admin', 'user'], { message: 'Papel inválido' })
  @IsOptional()
  role?: string;
} 