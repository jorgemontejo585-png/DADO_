import React from 'react';
import { useStore } from '../../context/StoreContext';

interface AdminProductsProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ navigate }) => {
  const { products, categories, toggleProductActive, flashMessage } = useStore();

  const getCategoryName = (categoryId: number) => {
    const cat = categories.find((c) => c.id_categoria === categoryId);
    return cat ? cat.nombre : '—';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  const handleToggle = (id: number, currentActive: boolean, name: string) => {
    const action = currentActive ? 'Desactivar' : 'Reactivar';
    if (window.confirm(`¿${action} este producto: "${name}"?`)) {
      toggleProductActive(id);
    }
  };

  return (
    <main className="module-container">
      <div className="section-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <h1 className="module-title">Administrar productos</h1>
          <p className="module-subtitle">Agrega, edita o desactiva productos del catálogo.</p>
        </div>
        <button
          type="button"
          className="module-btn"
          onClick={() => navigate('admin-add')}
        >
          + Nuevo producto
        </button>
      </div>

      {flashMessage && (
        <div className={`message message-${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}

      <table className="cart-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => {
              const isActive = p.activo === 1 || p.activo === true;
              return (
                <tr key={p.id_producto}>
                  <td>#{p.id_producto}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {p.imagen && (
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                      <span>{p.nombre}</span>
                    </div>
                  </td>
                  <td>{getCategoryName(p.id_categoria)}</td>
                  <td>${formatPrice(p.precio)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        background: isActive ? '#e8f5e9' : '#ffebee',
                        color: isActive ? '#256029' : '#b71c1c',
                      }}
                    >
                      {isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        style={{ color: '#c9a84c', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => navigate('admin-edit', { id: p.id_producto })}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        style={{ color: isActive ? '#b71c1c' : '#256029', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => handleToggle(p.id_producto, isActive, p.nombre)}
                      >
                        {isActive ? 'Desactivar' : 'Reactivar'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};
