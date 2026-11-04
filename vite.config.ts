import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const apiPlugin = (): Plugin => ({
  name: 'api-server-endpoints',
  configureServer(server) {
    // In-memory mock data for the API testing
    const productos = [
      { id_producto: 1, nombre: 'Camiseta Oversize Negra', descripcion: 'Camiseta oversize 100% algodón, corte urbano.', precio: 69900, stock: 40, id_categoria: 1, categoria: 'Camisetas', activo: 1 },
      { id_producto: 2, nombre: 'Camiseta Grafiti Blanca', descripcion: 'Estampado exclusivo inspirado en arte urbano.', precio: 79900, stock: 25, id_categoria: 1, categoria: 'Camisetas', activo: 1 },
      { id_producto: 3, nombre: 'Chaqueta Bomber Verde', descripcion: 'Chaqueta bomber acolchada, resistente al viento.', precio: 199900, stock: 15, id_categoria: 2, categoria: 'Chaquetas', activo: 1 },
      { id_producto: 4, nombre: 'Jean Cargo Gris', descripcion: 'Jean cargo con bolsillos laterales, fit relajado.', precio: 159900, stock: 30, id_categoria: 3, categoria: 'Pantalones', activo: 1 },
      { id_producto: 5, nombre: 'Gorra Snapback Coral', descripcion: 'Gorra ajustable con bordado 3D.', precio: 59900, stock: 48, id_categoria: 4, categoria: 'Accesorios', activo: 1 }
    ];

    server.middlewares.use((req, res, next) => {
      const url = req.url || '';

      // Set JSON headers and CORS for Postman
      if (url.startsWith('/api')) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }
      }

      const urlObj = new URL(url, 'http://localhost');
      const pathname = urlObj.pathname;

      // 1. GET /api/productos
      if (pathname === '/api/productos' && req.method === 'GET') {
        const cat = urlObj.searchParams.get('categoria');
        if (cat) {
          const filtered = productos.filter(p => p.id_categoria === Number(cat));
          res.statusCode = 200;
          res.end(JSON.stringify(filtered));
          return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(productos));
        return;
      }

      // 2. POST /api/productos (Crear producto)
      if ((pathname === '/api/productos' || pathname === '/api/productos/') && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const newId = productos.length + 1;
            const newProd = {
              id_producto: newId,
              nombre: data.nombre || 'Nuevo Producto',
              descripcion: data.descripcion || '',
              precio: Number(data.precio) || 50000,
              stock: Number(data.stock) || 10,
              id_categoria: Number(data.id_categoria) || 1,
              categoria: 'Ropa Urbana',
              activo: 1
            };
            productos.push(newProd);
            res.statusCode = 201;
            res.end(JSON.stringify({ success: true, id_producto: newId, mensaje: `Producto '${newProd.nombre}' registrado exitosamente.` }));
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, mensaje: 'JSON invalido' }));
          }
        });
        return;
      }

      // 3. POST /api/auth/login
      if (url === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            if (data.email === 'admin@boxesya.com' && data.password === 'admin123') {
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                usuario: {
                  id_usuario: 1,
                  nombre: 'Administrador DADO',
                  email: 'admin@boxesya.com',
                  rol: 'admin'
                },
                token: 'jwt-auth-dado-token-2026'
              }));
            } else {
              res.statusCode = 401;
              res.end(JSON.stringify({ success: false, mensaje: 'Credenciales invalidas.' }));
            }
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, mensaje: 'JSON invalido' }));
          }
        });
        return;
      }

      // 4. POST /api/pedidos
      if (url === '/api/pedidos' && req.method === 'POST') {
        res.statusCode = 201;
        res.end(JSON.stringify({
          success: true,
          id_pedido: 105,
          total: 139800,
          estado: 'Pendiente',
          mensaje: 'Pedido registrado correctamente en DADO.'
        }));
        return;
      }

      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
