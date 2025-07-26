import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // Obtener un usuario por ID
  async obtenerUno(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        pedidos: {
          include: {
            items: true,
          },
          orderBy: { creadoEn: 'desc' },
        },
        carrito: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  // Obtener estadísticas del usuario
  async obtenerEstadisticas(id: number) {
    const usuario = await this.obtenerUno(id);
    
    const totalPedidos = usuario.pedidos.length;
    const pedidosEntregados = usuario.pedidos.filter(p => p.estado === 'ENTREGADO').length;
    const totalGastado = usuario.pedidos
      .filter(p => p.estado === 'ENTREGADO')
      .reduce((sum, p) => sum + p.total, 0);
    
    const productosEnCarrito = usuario.carrito?.items.length || 0;

    return {
      totalPedidos,
      pedidosEntregados,
      totalGastado,
      productosEnCarrito,
      fechaRegistro: usuario.creadoEn,
    };
  }

  // Actualizar perfil del usuario
  async actualizarPerfil(id: number, datos: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    direccion?: string;
  }) {
    await this.obtenerUno(id); // Valida existencia
    
    return this.prisma.usuario.update({
      where: { id },
      data: datos,
    });
  }

  // Obtener historial de pedidos
  async obtenerHistorialPedidos(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        pedidos: {
          include: {
            items: {
              include: {
                producto: true,
              },
            },
          },
          orderBy: { creadoEn: 'desc' },
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario.pedidos;
  }
} 