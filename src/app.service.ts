import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: '🚀 API Ionic Backend funcionando correctamente',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        productos: '/api/productos',
        categorias: '/api/categorias',
        usuarios: '/api/usuarios'
      },
      timestamp: new Date().toISOString()
    };
  }
}
