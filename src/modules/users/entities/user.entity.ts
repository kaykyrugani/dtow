import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  name: string;

  @Column({ length: 100, unique: true })
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
  })
  email: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Senha do usuário (hash)',
    example: '$2b$10$...',
  })
  password: string;

  @Column({ default: 'user' })
  @ApiProperty({
    description: 'Papel do usuário',
    example: 'user',
    enum: ['admin', 'user'],
  })
  role: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Data da última atualização do usuário',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
} 