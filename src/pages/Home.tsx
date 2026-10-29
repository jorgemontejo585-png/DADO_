import React from 'react';
import { useStore } from '../context/StoreContext';

interface HomeProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  const { products, categories } = useStore();

  const activeProducts = products.filter((p) => p.activo === 1 || p.activo === true);
  const featuredProducts = [...activeProducts].sort((a, b) => b.id_producto - a.id_producto).slice(0, 3);

  const categoryIcons: Record<string, string> = {
    Camisetas: 'ti-shirt',
    Chaquetas: 'ti-jacket',
    Pantalones: 'ti-pants',
    Accesorios: 'ti-tag',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">NUEVA COLECCIÓN 2026</div>

          <h1 className="hero-title">
            Productos que nadie más tiene en Colombia
          </h1>

          <p className="hero-sub">
            Gadgets, accesorios y productos de tendencia mundial.
            Envíos contra entrega a todo el país.
          </p>

          <div className="hero-btns">
            <a
              href="#explorar"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-block' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('products');
              }}
            >
              Explorar tienda
            </a>
            <a
              href="#novedades"
              className="btn-ghost"
              style={{ textDecoration: 'none', display: 'inline-block' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('products');
              }}
            >
              Ver novedades →
            </a>
          </div>
        </div>

        <div className="hero-visual">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((p, index) => (
              <div
                key={p.id_producto}
                className={`hero-card ${index === 0 ? 'tall' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('product-detail', { id: p.id_producto })}
              >
                <div className="hero-card-img">
                  <i className="ti ti-box"></i>
                </div>
                <span className="badge-new">NUEVO</span>
                <div className="hero-card-name">{p.nombre}</div>
                <div className="hero-card-price">${formatPrice(p.precio)}</div>
              </div>
            ))
          ) : (
            <div className="hero-card tall">
              <div className="hero-card-img">
                <i className="ti ti-box"></i>
              </div>
              <div className="hero-card-name">Aún no hay productos</div>
            </div>
          )}
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-item">
          <i className="ti ti-truck"></i> Envío contra entrega a todo Colombia
        </div>
        <div className="trust-item">
          <i className="ti ti-shield-check"></i> Compra 100% segura
        </div>
        <div className="trust-item">
          <i className="ti ti-refresh"></i> Cambios sin preguntas
        </div>
        <div className="trust-item">
          <i className="ti ti-headset"></i> Soporte por WhatsApp
        </div>
      </div>

      {/* CATEGORÍAS */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">Categorías</span>
          <a
            href="#todas"
            className="section-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('products');
            }}
          >
            Ver todas
          </a>
        </div>

        <div className="cats">
          {categories.map((cat) => {
            const count = activeProducts.filter((p) => p.id_categoria === cat.id_categoria).length;
            return (
              <a
                key={cat.id_categoria}
                href={`#categoria-${cat.id_categoria}`}
                className="cat-card"
                style={{ textDecoration: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('products', { category: cat.id_categoria });
                }}
              >
                <div className="cat-icon">
                  <i className={`ti ${categoryIcons[cat.nombre] || 'ti-tag'}`}></i>
                </div>
                <div className="cat-name">{cat.nombre}</div>
                <div className="cat-count">{count} productos</div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
};
