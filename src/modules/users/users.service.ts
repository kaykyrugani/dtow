import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { MetricsService } from '../../modules/metrics/metrics.service';
import { LoggerService } from '../../logging/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly metricsService: MetricsService,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    
    this.metricsService.recordMetric('users_created', 1);
    this.logger.info('Usuário criado com sucesso', { userId: savedUser.id });
    
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findById(id);
      
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });

      this.metricsService.recordMetric('users_updated', 1);
      this.logger.info('Usuário atualizado com sucesso', { userId: id });
      
      return updatedUser;
    } catch (error) {
      this.metricsService.recordMetric('users_update_errors', 1);
      this.logger.error('Erro ao atualizar usuário', { error: error.message });
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      await this.usersRepository.remove(user);
      
      this.metricsService.recordMetric('users_deleted', 1);
      this.logger.info('Usuário removido com sucesso', { userId: id });
    } catch (error) {
      this.metricsService.recordMetric('users_deletion_errors', 1);
      this.logger.error('Erro ao remover usuário', { error: error.message });
      throw error;
    }
  }
} 