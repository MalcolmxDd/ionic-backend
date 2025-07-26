import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistroDto } from './dto/registro.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('registro')
  async registro(@Body() registroDto: RegistroDto) {
    return this.authService.registro(registroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Request() req) {
    return this.authService.verificarToken(req.headers.authorization?.split(' ')[1]);
  }
} 