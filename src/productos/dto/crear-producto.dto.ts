import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CrearProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @Min(0)
  precio: number;

  // Campos opcionales que se agregarán cuando se actualice el schema
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;

  @IsOptional()
  activo?: boolean;
}
