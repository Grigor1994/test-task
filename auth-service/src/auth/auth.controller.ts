import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, VerifyTokenDto } from './dto';
import { ILogin, IVerifyToken } from './interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ILogin> {
    const accessToken = await this.authService.login(loginDto);
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-token')
  async verify(@Body() token: VerifyTokenDto): Promise<IVerifyToken> {
    const isValid = await this.authService.isVerifyToken(token);

    return { isValidToken: isValid };
  }
}
