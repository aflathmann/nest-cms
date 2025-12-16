import { Role } from '../decorators/roles.decorator';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Role[];
}
