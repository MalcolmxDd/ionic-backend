import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  // Crear categoría
  @Post()
  async crear(@Body() crearCategoriaDto: CrearCategoriaDto) {
    return this.categoriasService.crear(crearCategoriaDto);
  }

  // Obtener todas las categorías
  @Get()
  async obtenerTodas() {
    return this.categoriasService.obtenerTodas();
  }

  // Obtener una categoría por ID
  @Get(':id')
  async obtenerUna(@Param('id', ParseIntPipe) id: number) {
    const categoria = await this.categoriasService.obtenerUna(id);
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return categoria;
  }

  // Actualizar categoría por ID
  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarCategoriaDto: ActualizarCategoriaDto,
  ) {
    const actualizada = await this.categoriasService.actualizar(id, actualizarCategoriaDto);
    if (!actualizada) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return actualizada;
  }

  // Eliminar categoría por ID
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    const eliminada = await this.categoriasService.eliminar(id);
    if (!eliminada) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return { mensaje: 'Categoría eliminada correctamente' };
  }
} 