import { Controller, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Post, Body, Get } from '@nestjs/common/decorators';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { UsersService } from 'src/users/users.service';
import type { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @SkipAuth()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: [LoginResponseDto],
  })
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const { email, password } = loginRequestDto;
    return this.authService.login(email, password);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The registered user',
    type: UserResponseDto,
  })
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.register(registerUserDto);
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile',
    type: UserResponseDto,
  })
  async getProfile(@Request() req: RequestWithUser): Promise<UserResponseDto> {
    const userId = req.user!.sub;
    await this.usersService.findOne(userId);
    return {} as UserResponseDto;
  }
}
