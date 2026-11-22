import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';
import { hashPassword, verifyPassword } from './password.util.js';

// Datos del usuario que se pueden devolver (nunca el password_hash)
const USUARIO_PUBLICO = {
  id: true,
  name: true,
  email: true,
  role: true,
  created_at: true,
} as const;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterAuthDto) {
    const password_hash = await hashPassword(dto.password);

    try {
      // El rol no se recibe del cliente: todo registro nuevo es "customer"
      return await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email.toLowerCase(),
          password_hash,
        },
        select: USUARIO_PUBLICO,
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una cuenta con ese correo electrónico.',
        );
      }

      throw error;
    }
  }

  async login(dto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user || !(await verifyPassword(dto.password, user.password_hash))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    };
  }
}
