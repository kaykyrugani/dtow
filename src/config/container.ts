import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { TokenService } from '../services/TokenService';
import { AuthService } from '../services/authService';
import { LoggingService } from '../services/LoggingService';
import { OrderService } from '../modules/order/services/order.service';
import { BaseService } from '../services/BaseService';
import { AddressService } from '../services/AddressService';
import { UsuarioService } from '../services/usuarioService';
import { PaymentService } from '../services/PaymentService';
import { CepService } from '../modules/address/services/CepService';
import { CouponService } from '../modules/coupon/services/coupon.service';
import { ReviewService } from '../modules/review/services/review.service';
import { CpfValidatorService } from '../modules/validation/services/CpfValidatorService';
import { ProductService } from '../modules/product/services/product.service';
import { env, EnvConfig } from './env';

// Registra instâncias singleton
container.registerInstance(PrismaClient, new PrismaClient());
container.registerInstance<EnvConfig>('Env', env);

// Registra repositórios
container.registerSingleton('UsuarioRepository', UsuarioRepository);

// Registra serviços base
container.registerSingleton('BaseService', BaseService);

// Registra serviços de infraestrutura
container.registerSingleton('LoggingService', LoggingService);
container.registerSingleton('TokenService', TokenService);
container.registerSingleton('CepService', CepService);
container.registerSingleton('CpfValidatorService', CpfValidatorService);

// Registra serviços de negócio
container.registerSingleton('AuthService', AuthService);
container.registerSingleton('UsuarioService', UsuarioService);
container.registerSingleton('AddressService', AddressService);
container.registerSingleton('ProductService', ProductService);
container.registerSingleton('OrderService', OrderService);
container.registerSingleton('PaymentService', PaymentService);
container.registerSingleton('CouponService', CouponService);
container.registerSingleton('ReviewService', ReviewService);

export { container }; 