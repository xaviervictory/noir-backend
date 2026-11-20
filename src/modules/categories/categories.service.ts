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
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({ data: dto });
    } catch (error) {
      this.manejarNombreRepetido(error);
      throw error;
    }
  }

  findAll() {
    return this.prisma.category.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`No existe una categoría con id ${id}.`);
    }

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id);

    try {
      return await this.prisma.category.update({ where: { id }, data: dto });
    } catch (error) {
      this.manejarNombreRepetido(error);
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede eliminar la categoría porque tiene productos asociados.',
        );
      }
      throw error;
    }
  }

  private manejarNombreRepetido(error: unknown) {
    if (isPrismaUniqueConstraintError(error)) {
      throw new ConflictException('Ya existe una categoría con ese nombre.');
    }
  }
}
