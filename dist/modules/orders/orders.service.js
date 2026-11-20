var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
const INCLUIR = {
    user: { select: { id: true, name: true, email: true } },
    items: { include: { product: true } },
};
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        await this.validarUsuario(dto.user_id);
        await this.validarProductos(dto.items.map((item) => item.product_id));
        this.validarTotal(dto);
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
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: INCLUIR,
        });
        if (!order) {
            throw new NotFoundException(`No existe un pedido con id ${id}.`);
        }
        return order;
    }
    async update(id, dto) {
        await this.findOne(id);
        const { status, total } = dto;
        return this.prisma.order.update({
            where: { id },
            data: { status, total },
            include: INCLUIR,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.order.delete({ where: { id } });
    }
    async validarUsuario(userId) {
        const usuario = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!usuario) {
            throw new BadRequestException(`El usuario con id ${userId} no existe.`);
        }
    }
    async validarProductos(productIds) {
        const ids = [...new Set(productIds)];
        const encontrados = await this.prisma.product.count({
            where: { id: { in: ids } },
        });
        if (encontrados !== ids.length) {
            throw new BadRequestException('Alguno de los productos del pedido no existe.');
        }
    }
    validarTotal(dto) {
        const suma = dto.items.reduce((acumulado, item) => acumulado + item.quantity * item.unit_price, 0);
        if (Math.abs(suma - dto.total) > 0.01) {
            throw new BadRequestException(`El total (${dto.total}) no coincide con la suma de los ítems (${suma.toFixed(2)}).`);
        }
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map