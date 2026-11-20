import { ContactService } from './contact.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactDto: CreateContactDto): import("../../generated/prisma/models.js").Prisma__ContactMessageClient<{
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
    update(id: number, updateContactDto: UpdateContactDto): Promise<{
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
