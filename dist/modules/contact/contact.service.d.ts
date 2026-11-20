import { PrismaService } from '../prisma/prisma.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
export declare class ContactService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateContactDto): import("../../generated/prisma/models.js").Prisma__ContactMessageClient<{
        name: string;
        created_at: Date;
        id: number;
        email: string;
        subject: string;
        message: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        name: string;
        created_at: Date;
        id: number;
        email: string;
        subject: string;
        message: string;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        created_at: Date;
        id: number;
        email: string;
        subject: string;
        message: string;
    }>;
    update(id: number, dto: UpdateContactDto): Promise<{
        name: string;
        created_at: Date;
        id: number;
        email: string;
        subject: string;
        message: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        created_at: Date;
        id: number;
        email: string;
        subject: string;
        message: string;
    }>;
}
