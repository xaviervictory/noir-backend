import { ContactService } from './contact.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactDto: CreateContactDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateContactDto: UpdateContactDto): string;
    remove(id: string): string;
}
