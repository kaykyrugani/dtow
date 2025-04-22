import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
  })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;

  @ApiProperty({
    description: 'Papel do usuário',
    example: 'user',
    enum: ['admin', 'user'],
    default: 'user',
  })
  @IsEnum(['admin', 'user'], { message: 'Papel inválido' })
  @IsNotEmpty({ message: 'Papel é obrigatório' })
  role: string;
} 