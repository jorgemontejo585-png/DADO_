import React from 'react';
import { useStore } from '../context/StoreContext';

interface OrdersProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Orders: React.FC<OrdersProps> = ({ navigate }) => {
  const { orders, currentUser, flashMessage } = useStore();

  const userOrders = currentUser
    ? orders.filter((o) => o.id_usuario === currentUser.id_usuario)
    : orders;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(
        2,
        '0'
      )}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="module-container">
      <h1 className="module-title">Mis pedidos</h1>
      <p className="module-subtitle">Historial de tus compras.</p>

      {flashMessage && (
        <div className={`message message-${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}

      {userOrders.length === 0 ? (
        <div className="empty-cart" style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2>Aún no tienes pedidos</h2>
          <p style={{ color: '#777', margin: '15px 0' }}>Cuando compres algo, aparecerá aquí.</p>
          <br />
          <button type="button" className="module-btn" onClick={() => navigate('products')}>
            Ver productos
          </button>
        </div>
      ) : (
        userOrders.map((pedido) => (
          <div key={pedido.id_pedido} className="form-box" style={{ maxWidth: '100%', marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <div>
                <strong>Pedido #{pedido.id_pedido}</strong>
                <span style={{ color: '#777', fontSize: '12px', marginLeft: '10px' }}>
                  — {formatDate(pedido.fecha_pedido)}
                  {pedido.metodo_pago && ` (${pedido.metodo_pago})`}
                </span>
              </div>
              <span className="badge-new">{pedido.estado}</span>
            </div>

            <table className="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                </tr>
              </thead>
              <tbody>
                {pedido.detalles.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>${formatPrice(item.precio_unitario)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-total" style={{ fontSize: '16px' }}>
              Total: ${formatPrice(pedido.total)}
            </div>
          </div>
        ))
      )}
    </main>
  );
};
