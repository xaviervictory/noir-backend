var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaForeignKeyError } from '../prisma/prisma-error.util.js';
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product) {
            throw new NotFoundException(`No existe un producto con id ${id}.`);
        }
        return product;
    }
    async update(id, dto) {
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
    async remove(id) {
        await this.findOne(id);
        try {
            return await this.prisma.product.delete({ where: { id } });
        }
        catch (error) {
            if (isPrismaForeignKeyError(error)) {
                throw new ConflictException('No se puede eliminar el producto porque tiene pedidos asociados.');
            }
            throw error;
        }
    }
    async validarCategoria(categoryId) {
        const categoria = await this.prisma.category.findUnique({
            where: { id: categoryId },
            select: { id: true },
        });
        if (!categoria) {
            throw new BadRequestException(`La categoría con id ${categoryId} no existe.`);
        }
    }
};
ProductsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map