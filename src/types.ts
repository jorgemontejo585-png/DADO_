/**
 * Entidad Categoria de prendas en DADO Streetwear.
 */
export interface Category {
  id_categoria: number;
  nombre: string;
  descripcion?: string;
}

/**
 * Entidad Producto: Representa los articulos del inventario de la tienda.
 */
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

/**
 * Item transaccional del carrito de compras.
 */
export interface CartItem {
  id_carrito_detalle: number;
  id_producto: number;
  cantidad: number;
}

/**
 * Desglose de detalle de producto dentro de un pedido registrado.
 */
export interface OrderDetail {
  id_detalle: number;
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  nombre: string;
}

/**
 * Entidad Pedido / Orden de compra generada en Checkout.
 */
export interface Order {
  id_pedido: number;
  id_usuario: number;
  fecha_pedido: string;
  estado: 'Pendiente' | 'Enviado' | 'Entregado';
  total: number;
  metodo_pago?: string;
  detalles: OrderDetail[];
}

/**
 * Entidad Usuario del sistema con control de acceso por rol (cliente o admin).
 */
export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  password?: string;
  telefono?: string;
  direccion?: string;
  rol: 'cliente' | 'admin';
}
