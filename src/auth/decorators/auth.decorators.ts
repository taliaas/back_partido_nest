import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';
import { Roles } from './roles.decorators';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guards';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
