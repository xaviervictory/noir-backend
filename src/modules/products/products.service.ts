import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaForeignKeyError } from '../prisma/prisma-error.util.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    await this.validarCategoria(dto.category_id);

    return this.prisma.product.create({
      data: dto,
      include: { category: true },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`No existe un producto con id ${id}.`);
    }

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    if (dto.category_id !== undefined) {
      await this.validarCategoria(dto.category_id);
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      if (isPrismaForeignKeyError(error)) {
        throw new ConflictException(
          'No se puede eliminar el producto porque tiene pedidos asociados.',
        );
      }
      throw error;
    }
  }

  private async validarCategoria(categoryId: number) {
    const categoria = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!categoria) {
      throw new BadRequestException(
        `La categoría con id ${categoryId} no existe.`,
      );
    }
  }
}
