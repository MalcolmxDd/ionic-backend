import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear categorías
  const categorias = await Promise.all([
    prisma.categoria.create({
      data: {
        nombre: 'Electrónicos',
        descripcion: 'Productos electrónicos y tecnología',
      },
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Ropa',
        descripcion: 'Vestimenta y accesorios',
      },
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Hogar',
        descripcion: 'Productos para el hogar',
      },
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Deportes',
        descripcion: 'Artículos deportivos',
      },
    }),
  ]);

  console.log('✅ Categorías creadas:', categorias.length);

  // Crear productos
  const productos = await Promise.all([
    prisma.producto.create({
      data: {
        nombre: 'iPhone 15 Pro',
        descripcion: 'El último iPhone con características avanzadas de cámara y rendimiento',
        precio: 999.99,
        stock: 50,
        imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        categoriaId: categorias[0].id, // Electrónicos
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'MacBook Air M2',
        descripcion: 'Laptop ultraligera con chip M2 para máxima eficiencia',
        precio: 1199.99,
        stock: 30,
        imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        categoriaId: categorias[0].id, // Electrónicos
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Camiseta Básica',
        descripcion: 'Camiseta de algodón 100% cómoda y versátil',
        precio: 29.99,
        stock: 100,
        imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        categoriaId: categorias[1].id, // Ropa
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Jeans Clásicos',
        descripcion: 'Jeans de alta calidad con ajuste perfecto',
        precio: 79.99,
        stock: 75,
        imagen: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        categoriaId: categorias[1].id, // Ropa
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Lámpara de Mesa',
        descripcion: 'Lámpara moderna con diseño minimalista',
        precio: 89.99,
        stock: 25,
        imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
        categoriaId: categorias[2].id, // Hogar
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Cafetera Automática',
        descripcion: 'Cafetera programable con molinillo integrado',
        precio: 199.99,
        stock: 15,
        imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        categoriaId: categorias[2].id, // Hogar
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Balón de Fútbol',
        descripcion: 'Balón oficial de competición profesional',
        precio: 49.99,
        stock: 60,
        imagen: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoriaId: categorias[3].id, // Deportes
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Raqueta de Tenis',
        descripcion: 'Raqueta profesional con tecnología avanzada',
        precio: 159.99,
        stock: 20,
        imagen: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
        categoriaId: categorias[3].id, // Deportes
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'AirPods Pro',
        descripcion: 'Audífonos inalámbricos con cancelación de ruido activa',
        precio: 249.99,
        stock: 40,
        imagen: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        categoriaId: categorias[0].id, // Electrónicos
        activo: true,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: 'Sudadera con Capucha',
        descripcion: 'Sudadera cómoda perfecta para el día a día',
        precio: 59.99,
        stock: 80,
        imagen: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
        categoriaId: categorias[1].id, // Ropa
        activo: true,
      },
    }),
  ]);

  console.log('✅ Productos creados:', productos.length);

  // Crear usuarios de prueba
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('123456', saltRounds);

  const usuario = await prisma.usuario.create({
    data: {
      email: 'cliente@test.com',
      password: passwordHash,
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '+1 234 567 8900',
      direccion: 'Calle Principal 123, Ciudad',
      rol: 'CLIENTE',
    },
  });

  const adminPasswordHash = await bcrypt.hash('admin123', saltRounds);
  const admin = await prisma.usuario.create({
    data: {
      email: 'admin@test.com',
      password: adminPasswordHash,
      nombre: 'Admin',
      apellido: 'Sistema',
      telefono: '+1 234 567 8901',
      direccion: 'Oficina Principal, Ciudad',
      rol: 'ADMIN',
    },
  });

  console.log('✅ Usuarios de prueba creados:');
  console.log(`   - Cliente: ${usuario.email} (password: 123456)`);
  console.log(`   - Admin: ${admin.email} (password: admin123)`);

  console.log('🎉 Seed completado exitosamente!');
  console.log(`📊 Resumen:`);
  console.log(`   - ${categorias.length} categorías creadas`);
  console.log(`   - ${productos.length} productos creados`);
  console.log(`   - 2 usuarios de prueba creados`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 