export interface Category {
  id_categoria: number;
  nombre: string;
  descripcion?: string;
}

export interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
  id_categoria: number;
  activo: number | boolean;
  categoria?: string;
}

export interface CartItem {
  id_carrito_detalle: number;
  id_producto: number;
  cantidad: number;
}

export interface OrderDetail {
  id_detalle: number;
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  nombre: string;
}

export interface Order {
  id_pedido: number;
  id_usuario: number;
  fecha_pedido: string;
  estado: 'Pendiente' | 'Enviado' | 'Entregado';
  total: number;
  metodo_pago?: string;
  detalles: OrderDetail[];
}

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  password?: string;
  telefono?: string;
  direccion?: string;
  rol: 'cliente' | 'admin';
}
