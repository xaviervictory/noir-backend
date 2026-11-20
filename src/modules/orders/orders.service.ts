import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

// Qué datos relacionados se devuelven con cada pedido (sin la contraseña del usuario)
const INCLUIR = {
  user: { select: { id: true, name: true, email: true } },
  items: { include: { product: true } },
} as const;

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    await this.validarUsuario(dto.user_id);
    await this.validarProductos(dto.items.map((item) => item.product_id));
    this.validarTotal(dto);

    // Se crea el pedido y sus ítems en una sola operación
    return this.prisma.order.create({
      data: {
        user_id: dto.user_id,
        status: dto.status,
        total: dto.total,
        items: { create: dto.items },
      },
      include: INCLUIR,
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: INCLUIR,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: INCLUIR,
    });

    if (!order) {
      throw new NotFoundException(`No existe un pedido con id ${id}.`);
    }

    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    await this.findOne(id);

    // Solo se pueden modificar el estado y el total del pedido
    const { status, total } = dto;

    return this.prisma.order.update({
      where: { id },
      data: { status, total },
      include: INCLUIR,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // Los ítems se borran solos (ON DELETE CASCADE)
    return this.prisma.order.delete({ where: { id } });
  }

  private async validarUsuario(userId: number) {
    const usuario = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!usuario) {
      throw new BadRequestException(`El usuario con id ${userId} no existe.`);
    }
  }

  private async validarProductos(productIds: number[]) {
    const ids = [...new Set(productIds)];
    const encontrados = await this.prisma.product.count({
      where: { id: { in: ids } },
    });

    if (encontrados !== ids.length) {
      throw new BadRequestException(
        'Alguno de los productos del pedido no existe.',
      );
    }
  }

  private validarTotal(dto: CreateOrderDto) {
    const suma = dto.items.reduce(
      (acumulado, item) => acumulado + item.quantity * item.unit_price,
      0,
    );

    if (Math.abs(suma - dto.total) > 0.01) {
      throw new BadRequestException(
        `El total (${dto.total}) no coincide con la suma de los ítems (${suma.toFixed(2)}).`,
      );
    }
  }
}
