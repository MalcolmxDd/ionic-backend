import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Producto } from '@prisma/client';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  // Crear nuevo producto
  async crear(crearProductoDto: CrearProductoDto): Promise<any> {
    return this.prisma.producto.create({
      data: crearProductoDto as any,
    });
  }

  // Obtener todos los productos
  async obtenerTodos(): Promise<any[]> {
    return this.prisma.producto.findMany({
      orderBy: { creadoEn: 'desc' },
    });
  }

  // Obtener productos por categoría
  async obtenerPorCategoria(categoriaId: number): Promise<any[]> {
    return this.prisma.producto.findMany({
      orderBy: { creadoEn: 'desc' },
    });
  }

  // Buscar productos por nombre
  async buscarPorNombre(nombre: string): Promise<any[]> {
    return this.prisma.producto.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
      },
      orderBy: { creadoEn: 'desc' },
    });
  }

  // Obtener un producto por su ID
  async obtenerUno(id: number): Promise<any> {
    const producto = await this.prisma.producto.findUnique({ 
      where: { id },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // Actualizar un producto por ID
  async actualizar(id: number, actualizarProductoDto: ActualizarProductoDto): Promise<any> {
    await this.obtenerUno(id); // Valida existencia
    return this.prisma.producto.update({
      where: { id },
      data: actualizarProductoDto as any,
    });
  }

  // Actualizar stock de un producto
  async actualizarStock(id: number, cantidad: number): Promise<any> {
    const producto = await this.obtenerUno(id);
    const nuevoStock = (producto as any).stock ? (producto as any).stock + cantidad : cantidad;
    
    if (nuevoStock < 0) {
      throw new Error('Stock insuficiente');
    }

    return this.prisma.producto.update({
      where: { id },
      data: { stock: nuevoStock } as any,
    });
  }

  // Eliminar un producto por ID (soft delete)
  async eliminar(id: number): Promise<any> {
    await this.obtenerUno(id); // Valida existencia
    return this.prisma.producto.update({
      where: { id },
      data: { activo: false } as any,
    });
  }

  // Eliminar permanentemente un producto
  async eliminarPermanente(id: number): Promise<Producto> {
    await this.obtenerUno(id); // Valida existencia
    return this.prisma.producto.delete({
      where: { id },
    });
  }
}
