import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): Promise<{
        category: {
            name: string;
            description: string | null;
            id: number;
        };
    } & {
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image_url: string | null;
        on_sale: boolean;
        category_id: number;
        created_at: Date;
        id: number;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        category: {
            name: string;
            description: string | null;
            id: number;
        };
    } & {
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image_url: string | null;
        on_sale: boolean;
        category_id: number;
        created_at: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            description: string | null;
            id: number;
        };
    } & {
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image_url: string | null;
        on_sale: boolean;
        category_id: number;
        created_at: Date;
        id: number;
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
        category: {
            name: string;
            description: string | null;
            id: number;
        };
    } & {
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image_url: string | null;
        on_sale: boolean;
        category_id: number;
        created_at: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        image_url: string | null;
        on_sale: boolean;
        category_id: number;
        created_at: Date;
        id: number;
    }>;
    private validarCategoria;
}
