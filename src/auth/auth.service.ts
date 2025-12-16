import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { PasswordUtil } from 'src/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {}
  // Auth service methods would go here
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    if (!email || !password) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'passwordHash', 'roles'],
    });
    if (user === null) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await PasswordUtil.comparePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
