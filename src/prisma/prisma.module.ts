// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que esté disponible globalmente (opcional pero útil)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
