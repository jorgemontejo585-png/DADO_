import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface ProductDetailProps {
  productId: number;
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, navigate }) => {
  const { products, categories, currentUser, addToCart } = useStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [localMessage, setLocalMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const producto = products.find((p) => p.id_producto === productId);

  if (!producto) {
    return (
      <main className="module-container">
        <div className="message message-error">Producto no encontrado.</div>
        <button type="button" className="module-btn" onClick={() => navigate('products')}>
          ← Volver a productos
        </button>
      </main>
    );
  }

  const category = categories.find((c) => c.id_categoria === producto.id_categoria);
  const categoryName = category ? category.nombre : 'Sin categoría';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addToCart(producto.id_producto, quantity);
    if (result.success) {
      setLocalMessage({ text: result.message, type: 'success' });
    } else {
      setLocalMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <main className="module-container">
      {localMessage && (
        <div className={`message message-${localMessage.type}`}>
          {localMessage.text}
        </div>
      )}

      <div className="product-detail">
        <div className="product-detail-image">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} />
          ) : (
            <div style={{ color: '#c9a84c', fontSize: '64px' }}>
              <i className="ti ti-box"></i>
            </div>
          )}
        </div>

        <div className="product-detail-info">
          <h1>{producto.nombre}</h1>

          <div className="price">${formatPrice(producto.precio)}</div>

          <p className="description">{producto.descripcion}</p>

          <p style={{ color: '#777', marginBottom: '10px' }}>
            Categoría: {categoryName}
          </p>

          <p style={{ color: '#777', marginBottom: '25px' }}>
            Stock disponible: {producto.stock}
          </p>

          {producto.stock > 0 ? (
            currentUser ? (
              <form onSubmit={handleAddToCart}>
                <div className="form-group" style={{ maxWidth: '200px' }}>
                  <label htmlFor="cantidad">Cantidad</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    min="1"
                    max={producto.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(Number(e.target.value), producto.stock)))}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button type="submit" className="module-btn">
                    Agregar al carrito
                  </button>
                  <button
                    type="button"
                    className="module-btn"
                    style={{ background: '#333', color: '#fff' }}
                    onClick={() => {
                      addToCart(producto.id_producto, quantity);
                      navigate('cart');
                    }}
                  >
                    Comprar ahora
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ color: '#aaa', marginBottom: '10px' }}>
                  Inicia sesión para agregar productos a tu carrito.
                </p>
                <button
                  type="button"
                  className="module-btn"
                  onClick={() => navigate('login')}
                >
                  Inicia sesión para comprar
                </button>
              </div>
            )
          ) : (
            <div className="message message-error">Producto agotado.</div>
          )}

          <br />
          <br />

          <button
            type="button"
            className="module-btn"
            style={{ background: '#222', color: '#ccc' }}
            onClick={() => navigate('products')}
          >
            ← Volver a productos
          </button>
        </div>
      </div>
    </main>
  );
};
