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
  Query,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Crear producto
  @Post()
  async crear(@Body() crearProductoDto: CrearProductoDto) {
    return this.productosService.crear(crearProductoDto);
  }

  // Obtener todos los productos
  @Get()
  async obtenerTodos() {
    return this.productosService.obtenerTodos();
  }

  // Buscar productos por nombre (debe ir antes que @Get(':id'))
  @Get('buscar')
  async buscarPorNombre(@Query('q') query: string) {
    if (!query) {
      return this.productosService.obtenerTodos();
    }
    return this.productosService.buscarPorNombre(query);
  }

  // Obtener productos por categoría (debe ir antes que @Get(':id'))
  @Get('categoria/:categoriaId')
  async obtenerPorCategoria(@Param('categoriaId', ParseIntPipe) categoriaId: number) {
    return this.productosService.obtenerPorCategoria(categoriaId);
  }

  // Obtener un producto por ID
  @Get(':id')
  async obtenerUno(@Param('id', ParseIntPipe) id: number) {
    const producto = await this.productosService.obtenerUno(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  // Actualizar producto por ID
  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarProductoDto: ActualizarProductoDto,
  ) {
    const actualizado = await this.productosService.actualizar(id, actualizarProductoDto);
    if (!actualizado) {
      throw new NotFoundException('Producto no encontrado');
    }
    return actualizado;
  }

  // Actualizar stock de producto
  @Put(':id/stock')
  async actualizarStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { cantidad: number },
  ) {
    return this.productosService.actualizarStock(id, body.cantidad);
  }

  // Eliminar producto por ID (soft delete)
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    const eliminado = await this.productosService.eliminar(id);
    if (!eliminado) {
      throw new NotFoundException('Producto no encontrado');
    }
    return { mensaje: 'Producto eliminado correctamente' };
  }

  // Eliminar producto permanentemente
  @Delete(':id/permanente')
  async eliminarPermanente(@Param('id', ParseIntPipe) id: number) {
    const eliminado = await this.productosService.eliminarPermanente(id);
    if (!eliminado) {
      throw new NotFoundException('Producto no encontrado');
    }
    return { mensaje: 'Producto eliminado permanentemente' };
  }
}
