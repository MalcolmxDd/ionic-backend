import { Controller, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':id')
  async obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerUno(id);
  }

  @Get(':id/estadisticas')
  async obtenerEstadisticas(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerEstadisticas(id);
  }

  @Get(':id/pedidos')
  async obtenerHistorialPedidos(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerHistorialPedidos(id);
  }

  @Put(':id/perfil')
  async actualizarPerfil(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: {
      nombre?: string;
      apellido?: string;
      telefono?: string;
      direccion?: string;
    }
  ) {
    return this.usuariosService.actualizarPerfil(id, datos);
  }
} 