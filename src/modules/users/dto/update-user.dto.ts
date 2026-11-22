import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

// Solo se pueden modificar el nombre y el correo
export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['name', 'email'] as const),
) {}
