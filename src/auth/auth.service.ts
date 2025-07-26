import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (usuario && await bcrypt.compare(password, usuario.password)) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const usuario = await this.validateUser(email, password);
    
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Cuenta desactivada');
    }

    const payload = { 
      email: usuario.email, 
      sub: usuario.id,
      rol: usuario.rol 
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
      },
    };
  }

  async registro(datos: {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    direccion?: string;
  }) {
    // Verificar si el email ya existe
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: datos.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(datos.password, saltRounds);

    // Crear el usuario
    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        email: datos.email,
        password: hashedPassword,
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        direccion: datos.direccion,
        rol: 'CLIENTE',
      },
    });

    // Generar token
    const payload = { 
      email: nuevoUsuario.email, 
      sub: nuevoUsuario.id,
      rol: nuevoUsuario.rol 
    };

    const { password, ...usuarioSinPassword } = nuevoUsuario;

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuarioSinPassword.id,
        email: usuarioSinPassword.email,
        nombre: usuarioSinPassword.nombre,
        apellido: usuarioSinPassword.apellido,
        rol: usuarioSinPassword.rol,
      },
    };
  }

  async verificarToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: payload.sub },
      });

      if (!usuario || !usuario.activo) {
        throw new UnauthorizedException('Usuario no válido');
      }

      return {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
} 