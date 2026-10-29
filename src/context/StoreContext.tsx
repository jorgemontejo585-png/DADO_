import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Product, CartItem, Order, User } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_ORDERS } from '../data/initialData';

interface StoreContextType {
  categories: Category[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  currentUser: User | null;
  flashMessage: { text: string; type: 'success' | 'error' } | null;
  setFlashMessage: (msg: { text: string; type: 'success' | 'error' } | null) => void;
  addToCart: (productId: number, quantity: number) => { success: boolean; message: string };
  updateCartItem: (cartDetailId: number, quantity: number) => void;
  removeCartItem: (cartDetailId: number) => void;
  clearCart: () => void;
  createOrder: (metodo_pago: string) => { success: boolean; orderId?: number; message?: string };
  addProduct: (product: Omit<Product, 'id_producto' | 'activo'>) => number;
  updateProduct: (id: number, product: Partial<Product>) => void;
  toggleProductActive: (id: number) => { nuevoEstado: boolean; nombre: string };
  login: (email: string) => boolean;
  register: (data: { nombre: string; email: string; telefono?: string; direccion?: string }) => { success: boolean; message: string };
  updateProfile: (data: Partial<User>) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('dado_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dado_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dado_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dado_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('dado_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dado_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0];
      }
    }
    // Default to the admin user so previewer immediately has full access
    return INITIAL_USERS[0];
  });

  const [flashMessage, setFlashMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('dado_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dado_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dado_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dado_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dado_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dado_current_user');
    }
  }, [currentUser]);

  const addToCart = (productId: number, quantity: number) => {
    const product = products.find((p) => p.id_producto === productId && (p.activo === 1 || p.activo === true));
    if (!product) {
      return { success: false, message: 'El producto ya no está disponible.' };
    }
    if (product.stock < 1) {
      return { success: false, message: 'Ese producto está agotado.' };
    }

    const qty = Math.max(1, Math.min(quantity, product.stock));

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id_producto === productId);
      if (existing) {
        const nuevaCantidad = Math.min(existing.cantidad + qty, product.stock);
        return prevCart.map((item) =>
          item.id_producto === productId ? { ...item, cantidad: nuevaCantidad } : item
        );
      } else {
        const nextId = prevCart.length > 0 ? Math.max(...prevCart.map((i) => i.id_carrito_detalle)) + 1 : 1;
        return [...prevCart, { id_carrito_detalle: nextId, id_producto: productId, cantidad: qty }];
      }
    });

    const msg = `${product.nombre} se agregó al carrito.`;
    setFlashMessage({ text: msg, type: 'success' });
    return { success: true, message: msg };
  };

  const updateCartItem = (cartDetailId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id_carrito_detalle === cartDetailId) {
          const product = products.find((p) => p.id_producto === item.id_producto);
          const maxStock = product ? product.stock : 99;
          const validQty = Math.max(1, Math.min(quantity, maxStock));
          return { ...item, cantidad: validQty };
        }
        return item;
      })
    );
  };

  const removeCartItem = (cartDetailId: number) => {
    setCart((prev) => prev.filter((item) => item.id_carrito_detalle !== cartDetailId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (metodo_pago: string) => {
    if (cart.length === 0) {
      return { success: false, message: 'El carrito está vacío' };
    }

    // Check stock
    for (const item of cart) {
      const p = products.find((prod) => prod.id_producto === item.id_producto);
      if (!p || item.cantidad > p.stock) {
        return { success: false, message: 'Uno de los productos ya no tiene stock suficiente. Revisa tu carrito.' };
      }
    }

    const orderId = orders.length > 0 ? Math.max(...orders.map((o) => o.id_pedido)) + 1 : 1;
    let total = 0;
    const detalles = cart.map((item, idx) => {
      const p = products.find((prod) => prod.id_producto === item.id_producto)!;
      const subtotal = p.precio * item.cantidad;
      total += subtotal;
      return {
        id_detalle: idx + 1,
        id_pedido: orderId,
        id_producto: p.id_producto,
        cantidad: item.cantidad,
        precio_unitario: p.precio,
        nombre: p.nombre,
      };
    });

    // Reduce stock
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((c) => c.id_producto === p.id_producto);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.cantidad) };
        }
        return p;
      })
    );

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(
      now.getSeconds()
    ).padStart(2, '0')}`;

    const newOrder: Order = {
      id_pedido: orderId,
      id_usuario: currentUser ? currentUser.id_usuario : 1,
      fecha_pedido: formattedDate,
      estado: 'Pendiente',
      total,
      metodo_pago,
      detalles,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setFlashMessage({ text: `¡Tu pedido #${orderId} se registró correctamente!`, type: 'success' });
    return { success: true, orderId };
  };

  const addProduct = (productData: Omit<Product, 'id_producto' | 'activo'>) => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id_producto)) + 1 : 1;
    const newProduct: Product = {
      ...productData,
      id_producto: nextId,
      activo: 1,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setFlashMessage({ text: `Producto "${newProduct.nombre}" agregado correctamente.`, type: 'success' });
    return nextId;
  };

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id_producto === id ? { ...p, ...productData } : p))
    );
    setFlashMessage({ text: `Producto actualizado correctamente.`, type: 'success' });
  };

  const toggleProductActive = (id: number) => {
    let nuevoEstado = false;
    let nombre = '';
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id_producto === id) {
          const current = p.activo === 1 || p.activo === true;
          nuevoEstado = !current;
          nombre = p.nombre;
          return { ...p, activo: nuevoEstado ? 1 : 0 };
        }
        return p;
      })
    );
    const msg = nuevoEstado ? `Producto "${nombre}" reactivado.` : `Producto "${nombre}" desactivado.`;
    setFlashMessage({ text: msg, type: 'success' });
    return { nuevoEstado, nombre };
  };

  const login = (email: string) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    // If not found, create a demo user with that email
    const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id_usuario)) + 1 : 1;
    const isNewAdmin = email.toLowerCase().includes('admin');
    const newUser: User = {
      id_usuario: nextId,
      nombre: email.split('@')[0],
      email: email,
      rol: isNewAdmin ? 'admin' : 'cliente',
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const register = (data: { nombre: string; email: string; telefono?: string; direccion?: string }) => {
    const existing = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'Este correo ya está registrado.' };
    }
    const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id_usuario)) + 1 : 1;
    const isNewAdmin = data.email.toLowerCase().includes('admin');
    const newUser: User = {
      id_usuario: nextId,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      direccion: data.direccion,
      rol: isNewAdmin ? 'admin' : 'cliente',
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Registro exitoso. Ya puedes iniciar sesión.' };
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id_usuario === currentUser.id_usuario ? updatedUser : u)));
    setFlashMessage({ text: 'Perfil actualizado correctamente.', type: 'success' });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        cart,
        orders,
        currentUser,
        flashMessage,
        setFlashMessage,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        createOrder,
        addProduct,
        updateProduct,
        toggleProductActive,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
