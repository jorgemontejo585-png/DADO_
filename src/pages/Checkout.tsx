import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface CheckoutProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ navigate }) => {
  const { cart, products, createOrder } = useStore();
  const [metodoPago, setMetodoPago] = useState<string>('Efectivo');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const cartRows = cart.map((item) => {
    const product = products.find((p) => p.id_producto === item.id_producto);
    const subtotal = product ? product.precio * item.cantidad : 0;
    return {
      ...item,
      product,
      subtotal,
    };
  });

  const total = cartRows.reduce((acc, row) => acc + row.subtotal, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createOrder(metodoPago);
    if (result.success) {
      navigate('orders');
    } else {
      setErrorMessage(result.message || 'Error al procesar el pedido.');
    }
  };

  if (cartRows.length === 0) {
    return (
      <main className="module-container">
        <h1 className="module-title">Finalizar compra</h1>
        <p className="module-subtitle">Tu carrito está actualmente vacío.</p>
        <button type="button" className="module-btn" onClick={() => navigate('products')}>
          Ver productos
        </button>
      </main>
    );
  }

  return (
    <main className="module-container">
      <h1 className="module-title">Finalizar compra</h1>
      <p className="module-subtitle">Confirma tu pedido y elige el método de pago.</p>

      {errorMessage !== '' && (
        <div className="message message-error">{errorMessage}</div>
      )}

      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartRows.map((item) => {
            const product = item.product;
            if (!product) return null;
            return (
              <tr key={item.id_carrito_detalle}>
                <td>{product.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${formatPrice(item.subtotal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="cart-total">Total a pagar: ${formatPrice(total)}</div>

      <div className="form-box">
        <form onSubmit={handleConfirmOrder}>
          <div className="form-group">
            <label htmlFor="metodo_pago">Método de pago</label>
            <select
              id="metodo_pago"
              name="metodo_pago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              required
            >
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Efectivo">Efectivo (contra entrega)</option>
            </select>
          </div>

          <button type="submit" className="module-btn" style={{ width: '100%' }}>
            Confirmar pedido
          </button>
        </form>
      </div>

      <button
        type="button"
        className="module-btn"
        style={{ background: '#333', color: '#fff' }}
        onClick={() => navigate('cart')}
      >
        ← Volver al carrito
      </button>
    </main>
  );
};
