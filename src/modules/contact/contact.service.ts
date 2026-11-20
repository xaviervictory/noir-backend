import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number) {
    const mensaje = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!mensaje) {
      throw new NotFoundException(`No existe un mensaje con id ${id}.`);
    }

    return mensaje;
  }

  async update(id: number, dto: UpdateContactDto) {
    await this.findOne(id);

    return this.prisma.contactMessage.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.contactMessage.delete({ where: { id } });
  }
}
