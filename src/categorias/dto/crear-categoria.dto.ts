import { IsString, IsOptional } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
} 