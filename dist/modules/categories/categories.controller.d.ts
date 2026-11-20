import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
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
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        description: string | null;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        id: number;
    }>;
}
