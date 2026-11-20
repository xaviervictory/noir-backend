export declare class CreateOrderItemDto {
    product_id: number;
    quantity: number;
    unit_price: number;
}
export declare class CreateOrderDto {
    user_id: number;
    status?: string;
    total: number;
    items: CreateOrderItemDto[];
}
