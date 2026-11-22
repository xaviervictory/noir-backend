import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  isPrismaForeignKeyError,
  isPrismaUniqueConstraintError,
} from '../prisma/prisma-error.util.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

// Datos del usuario que se pueden devolver (nunca el password_hash)
const USUARIO_PUBLICO = {
  id: true,
  name: true,
  email: true,
  role: true,
  created_at: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: USUARIO_PUBLICO,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USUARIO_PUBLICO,
    });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: dto.name,
          email: dto.email?.toLowerCase(),
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

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.user.delete({
        where: { id },
        select: USUARIO_PUBLICO,
      });
    } catch (error) {
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede eliminar el usuario porque tiene pedidos asociados.',
        );
      }

      throw error;
    }
  }
}
