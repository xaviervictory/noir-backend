import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoryDto): Promise<{
        name: string;
        description: string | null;
        id: number;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        name: string;
        description: string | null;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        description: string | null;
        id: number;
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        name: string;
        description: string | null;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        id: number;
    }>;
    private manejarNombreRepetido;
}
