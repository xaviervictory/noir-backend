var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, Min, ValidateNested, } from 'class-validator';
export class CreateOrderItemDto {
    product_id;
    quantity;
    unit_price;
}
__decorate([
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "product_id", void 0);
__decorate([
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
__decorate([
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "unit_price", void 0);
export class CreateOrderDto {
    user_id;
    status;
    total;
    items;
}
__decorate([
    IsInt(),
    IsPositive(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "user_id", void 0);
__decorate([
    IsOptional(),
    IsIn(['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total", void 0);
__decorate([
    IsArray(),
    ArrayMinSize(1),
    ValidateNested({ each: true }),
    Type(() => CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
//# sourceMappingURL=create-order.dto.js.map