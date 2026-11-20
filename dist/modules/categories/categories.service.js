var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaForeignKeyError, isPrismaUniqueConstraintError, } from '../prisma/prisma-error.util.js';
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.category.create({ data: dto });
        }
        catch (error) {
            this.manejarNombreRepetido(error);
            throw error;
        }
    }
    findAll() {
        return this.prisma.category.findMany({ orderBy: { id: 'asc' } });
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException(`No existe una categoría con id ${id}.`);
        }
        return category;
    }
    async update(id, dto) {
        await this.findOne(id);
        try {
            return await this.prisma.category.update({ where: { id }, data: dto });
        }
        catch (error) {
            this.manejarNombreRepetido(error);
            throw error;
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            return await this.prisma.category.delete({ where: { id } });
        }
        catch (error) {
            if (isPrismaForeignKeyError(error)) {
                throw new ConflictException('No se puede eliminar la categoría porque tiene productos asociados.');
            }
            throw error;
        }
    }
    manejarNombreRepetido(error) {
        if (isPrismaUniqueConstraintError(error)) {
            throw new ConflictException('Ya existe una categoría con ese nombre.');
        }
    }
};
CategoriesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CategoriesService);
export { CategoriesService };
//# sourceMappingURL=categories.service.js.map