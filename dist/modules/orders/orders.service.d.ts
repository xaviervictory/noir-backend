import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrderDto): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
        items: ({
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                image_url: string | null;
                on_sale: boolean;
                category_id: number;
                created_at: Date;
                id: number;
            };
        } & {
            id: number;
            product_id: number;
            quantity: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            order_id: number;
        })[];
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        user: {
            name: string;
            id: number;
            email: string;
        };
        items: ({
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                image_url: string | null;
                on_sale: boolean;
                category_id: number;
                created_at: Date;
                id: number;
            };
        } & {
            id: number;
            product_id: number;
            quantity: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            order_id: number;
        })[];
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    findOne(id: number): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
        items: ({
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                image_url: string | null;
                on_sale: boolean;
                category_id: number;
                created_at: Date;
                id: number;
            };
        } & {
            id: number;
            product_id: number;
            quantity: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            order_id: number;
        })[];
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    update(id: number, dto: UpdateOrderDto): Promise<{
        user: {
            name: string;
            id: number;
            email: string;
        };
        items: ({
            product: {
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                image_url: string | null;
                on_sale: boolean;
                category_id: number;
                created_at: Date;
                id: number;
            };
        } & {
            id: number;
            product_id: number;
            quantity: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            order_id: number;
        })[];
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    remove(id: number): Promise<{
        created_at: Date;
        id: number;
        user_id: number;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    private validarUsuario;
    private validarProductos;
    private validarTotal;
}
