import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  product_id: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unit_price: number;
}

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsOptional()
  @IsIn(['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'])
  status?: string;

  @IsNumber()
  @Min(0)
  total: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
