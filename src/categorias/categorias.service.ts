import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Categoria } from '@prisma/client';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  // Crear nueva categoría
  async crear(crearCategoriaDto: CrearCategoriaDto): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: crearCategoriaDto,
    });
  }

  // Obtener todas las categorías
  async obtenerTodas(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany({
      include: {
        _count: {
          select: { productos: true },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  // Obtener una categoría por su ID
  async obtenerUna(id: number): Promise<Categoria> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: {
        productos: {
          where: { activo: true },
        },
        _count: {
          select: { productos: true },
        },
      },
    });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }

  // Actualizar una categoría por ID
  async actualizar(id: number, actualizarCategoriaDto: ActualizarCategoriaDto): Promise<Categoria> {
    await this.obtenerUna(id); // Valida existencia
    return this.prisma.categoria.update({
      where: { id },
      data: actualizarCategoriaDto,
    });
  }

  // Eliminar una categoría por ID
  async eliminar(id: number): Promise<Categoria> {
    await this.obtenerUna(id); // Valida existencia
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
} 