import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface ProductsProps {
  navigate: (route: string, params?: Record<string, any>) => void;
  initialCategory?: number;
}

export const Products: React.FC<ProductsProps> = ({ navigate, initialCategory = 0 }) => {
  const { products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<number>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeProducts = products.filter((p) => p.activo === 1 || p.activo === true);

  const filteredProducts = activeProducts.filter((p) => {
    const matchesCategory = selectedCategory === 0 || p.id_categoria === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId: number) => {
    const cat = categories.find((c) => c.id_categoria === categoryId);
    return cat ? cat.nombre : 'Sin categoría';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <main className="module-container">
      <h1 className="module-title">Productos</h1>
      <p className="module-subtitle">Descubre nuestros productos disponibles.</p>

      {/* FILTRO DE CATEGORIAS */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          type="button"
          className="module-btn"
          style={selectedCategory === 0 ? {} : { background: '#333', color: '#fff' }}
          onClick={() => setSelectedCategory(0)}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.id_categoria}
            type="button"
            className="module-btn"
            style={selectedCategory === c.id_categoria ? {} : { background: '#333', color: '#fff' }}
            onClick={() => setSelectedCategory(c.id_categoria)}
          >
            {c.nombre}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '9px 14px',
              border: '1px solid #333',
              borderRadius: '4px',
              background: '#1e1e1e',
              color: 'white',
              fontSize: '13px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <div key={producto.id_producto} className="product-card">
              {producto.imagen && (
                <div className="product-image" style={{ cursor: 'pointer' }} onClick={() => navigate('product-detail', { id: producto.id_producto })}>
                  <img src={producto.imagen} alt={producto.nombre} onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                </div>
              )}

              <div className="product-name" style={{ cursor: 'pointer' }} onClick={() => navigate('product-detail', { id: producto.id_producto })}>
                {producto.nombre}
              </div>

              <p style={{ color: '#777', fontSize: '12px', marginBottom: '10px', minHeight: '32px' }}>
                {producto.descripcion}
              </p>

              <div className="product-price">${formatPrice(producto.precio)}</div>

              <p style={{ color: '#777', fontSize: '12px', marginBottom: '6px' }}>
                Categoría: {getCategoryName(producto.id_categoria)}
              </p>

              <div className="product-stock">Stock: {producto.stock}</div>

              <button
                type="button"
                className="module-btn"
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => navigate('product-detail', { id: producto.id_producto })}
              >
                Ver producto
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', color: '#777', padding: '20px 0' }}>
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </main>
  );
};
