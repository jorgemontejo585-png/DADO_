import { Category, Product, Order, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id_categoria: 1, nombre: 'Camisetas', descripcion: 'Camisetas urbanas de algodón premium' },
  { id_categoria: 2, nombre: 'Chaquetas', descripcion: 'Chaquetas y abrigos streetwear' },
  { id_categoria: 3, nombre: 'Pantalones', descripcion: 'Jeans, joggers y cargos' },
  { id_categoria: 4, nombre: 'Accesorios', descripcion: 'Gorras, bolsos y complementos' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id_producto: 1,
    nombre: 'Camiseta Oversize Negra',
    descripcion: 'Camiseta oversize 100% algodón, corte urbano.',
    precio: 69900,
    stock: 40,
    imagen: 'https://picsum.photos/seed/box1/600/700',
    id_categoria: 1,
    activo: 1,
  },
  {
    id_producto: 2,
    nombre: 'Camiseta Grafiti Blanca',
    descripcion: 'Estampado exclusivo inspirado en arte urbano.',
    precio: 79900,
    stock: 25,
    imagen: 'https://picsum.photos/seed/box2/600/700',
    id_categoria: 1,
    activo: 1,
  },
  {
    id_producto: 3,
    nombre: 'Chaqueta Bomber Verde',
    descripcion: 'Chaqueta bomber acolchada, resistente al viento.',
    precio: 199900,
    stock: 15,
    imagen: 'https://picsum.photos/seed/box3/600/700',
    id_categoria: 2,
    activo: 1,
  },
  {
    id_producto: 4,
    nombre: 'Jean Cargo Gris',
    descripcion: 'Jean cargo con bolsillos laterales, fit relajado.',
    precio: 159900,
    stock: 30,
    imagen: 'https://picsum.photos/seed/box4/600/700',
    id_categoria: 3,
    activo: 1,
  },
  {
    id_producto: 5,
    nombre: 'Gorra Snapback Coral',
    descripcion: 'Gorra ajustable con bordado 3D.',
    precio: 59900,
    stock: 48,
    imagen: 'https://picsum.photos/seed/box5/600/700',
    id_categoria: 4,
    activo: 1,
  },
];

export const INITIAL_USERS: User[] = [
  {
    id_usuario: 1,
    nombre: 'Administrador',
    email: 'admin@boxesya.com',
    password: 'admin123',
    telefono: '3001234567',
    direccion: 'Calle 100 #15-20, Bogotá',
    rol: 'admin',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id_pedido: 1,
    id_usuario: 1,
    fecha_pedido: '2026-07-02 22:52:02',
    estado: 'Pendiente',
    total: 119800,
    metodo_pago: 'Tarjeta',
    detalles: [
      {
        id_detalle: 1,
        id_pedido: 1,
        id_producto: 5,
        cantidad: 2,
        precio_unitario: 59900,
        nombre: 'Gorra Snapback Coral',
      },
    ],
  },
];
