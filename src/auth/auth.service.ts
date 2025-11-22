import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { PasswordUtil } from 'src/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  // Auth service methods would go here
  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    if (!username || !password) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'passwordHash'],
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
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
