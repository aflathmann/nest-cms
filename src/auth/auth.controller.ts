import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Post, Body } from '@nestjs/common/decorators';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: [LoginResponseDto],
  })
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const { username, password } = loginRequestDto;
    return this.authService.login(username, password);
  }
}
