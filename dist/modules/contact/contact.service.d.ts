import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
export declare class ContactService {
    create(createContactDto: CreateContactDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateContactDto: UpdateContactDto): string;
    remove(id: number): string;
}
