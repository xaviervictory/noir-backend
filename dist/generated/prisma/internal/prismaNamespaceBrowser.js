import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Category: 'Category',
    User: 'User',
    Product: 'Product',
    Order: 'Order',
    OrderItem: 'OrderItem',
    ContactMessage: 'ContactMessage'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description'
};
export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    created_at: 'created_at'
};
export const ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    stock: 'stock',
    image_url: 'image_url',
    on_sale: 'on_sale',
    category_id: 'category_id',
    created_at: 'created_at'
};
export const OrderScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    status: 'status',
    total: 'total',
    created_at: 'created_at'
};
export const OrderItemScalarFieldEnum = {
    id: 'id',
    order_id: 'order_id',
    product_id: 'product_id',
    quantity: 'quantity',
    unit_price: 'unit_price'
};
export const ContactMessageScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    subject: 'subject',
    message: 'message',
    created_at: 'created_at'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map