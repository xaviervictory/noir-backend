var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ContactService = class ContactService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.contactMessage.create({ data: dto });
    }
    findAll() {
        return this.prisma.contactMessage.findMany({
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const mensaje = await this.prisma.contactMessage.findUnique({
            where: { id },
        });
        if (!mensaje) {
            throw new NotFoundException(`No existe un mensaje con id ${id}.`);
        }
        return mensaje;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.contactMessage.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.contactMessage.delete({ where: { id } });
    }
};
ContactService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ContactService);
export { ContactService };
//# sourceMappingURL=contact.service.js.map