import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface CartProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Cart: React.FC<CartProps> = ({ navigate }) => {
  const { cart, products, updateCartItem, removeCartItem, flashMessage, setFlashMessage } = useStore();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const cartRows = cart.map((item) => {
    const product = products.find((p) => p.id_producto === item.id_producto);
    const qty = quantities[item.id_carrito_detalle] ?? item.cantidad;
    const subtotal = product ? product.precio * item.cantidad : 0;
    return {
      ...item,
      product,
      inputQty: qty,
      subtotal,
    };
  });

  const total = cartRows.reduce((acc, row) => acc + row.subtotal, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  const handleQtyChange = (cartDetailId: number, val: number) => {
    setQuantities((prev) => ({ ...prev, [cartDetailId]: val }));
  };

  const handleUpdate = (cartDetailId: number, maxStock: number) => {
    const rawVal = quantities[cartDetailId];
    if (rawVal !== undefined) {
      const valid = Math.max(1, Math.min(rawVal, maxStock));
      updateCartItem(cartDetailId, valid);
      setFlashMessage({ text: 'Cantidad actualizada.', type: 'success' });
    }
  };

  return (
    <main className="module-container">
      <h1 className="module-title">Mi carrito</h1>
      <p className="module-subtitle">Revisa los productos que has agregado.</p>

      {flashMessage && (
        <div className={`message message-${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}

      {cartRows.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartRows.map((item) => {
                const product = item.product;
                if (!product) return null;
                const currentVal = quantities[item.id_carrito_detalle] ?? item.cantidad;

                return (
                  <tr key={item.id_carrito_detalle}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {product.imagen && (
                          <img
                            src={product.imagen}
                            alt={product.nombre}
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        )}
                        <span
                          style={{ cursor: 'pointer', color: '#eee' }}
                          onClick={() => navigate('product-detail', { id: product.id_producto })}
                        >
                          {product.nombre}
                        </span>
                      </div>
                    </td>
                    <td>${formatPrice(product.precio)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="number"
                          value={currentVal}
                          min={1}
                          max={product.stock}
                          onChange={(e) => handleQtyChange(item.id_carrito_detalle, Number(e.target.value))}
                          style={{ width: '60px', padding: '6px', background: '#1e1e1e', color: 'white', border: '1px solid #333' }}
                        />
                        <button
                          type="button"
                          className="module-btn"
                          style={{ padding: '6px 10px', fontSize: '11px' }}
                          onClick={() => handleUpdate(item.id_carrito_detalle, product.stock)}
                        >
                          Actualizar
                        </button>
                      </div>
                    </td>
                    <td>${formatPrice(item.subtotal)}</td>
                    <td>
                      <button
                        type="button"
                        style={{ color: '#b71c1c', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => removeCartItem(item.id_carrito_detalle)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-total">Total: ${formatPrice(total)}</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <button
              type="button"
              className="module-btn"
              style={{ background: '#333', color: '#fff' }}
              onClick={() => navigate('products')}
            >
              ← Continuar comprando
            </button>

            <button
              type="button"
              className="module-btn"
              onClick={() => navigate('checkout')}
            >
              Finalizar compra
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart" style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2>Tu carrito está vacío</h2>
          <p style={{ color: '#777', margin: '15px 0' }}>No tienes productos agregados al carrito.</p>
          <br />
          <button type="button" className="module-btn" onClick={() => navigate('products')}>
            Ver productos
          </button>
        </div>
      )}
    </main>
  );
};
