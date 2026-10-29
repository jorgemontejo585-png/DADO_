import React from 'react';
import { useStore } from '../context/StoreContext';

interface NavProps {
  currentRoute: string;
  navigate: (route: string, params?: Record<string, any>) => void;
  isAdmin?: boolean;
}

export const Nav: React.FC<NavProps> = ({ currentRoute, navigate, isAdmin = false }) => {
  const { currentUser, cart, logout } = useStore();
  const totalCartItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  if (isAdmin) {
    return (
      <nav className="nav">
        <div className="logo" onClick={() => navigate('admin-products')} style={{ cursor: 'pointer' }}>
          <img src="/imagenes/logo.png" alt="Logo de DADO" style={{ width: '32px', height: '32px', borderRadius: '5px' }} />
          <span className="logo-text">DADO ADMIN</span>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#sitio" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
              Sitio
            </a>
          </li>
          <li>
            <a href="#admin-productos" onClick={(e) => { e.preventDefault(); navigate('admin-products'); }}>
              Productos
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          {currentUser && (
            <span style={{ fontSize: '13px', color: '#333' }}>
              Hola, {currentUser.nombre}
            </span>
          )}
          <a
            href="#salir"
            className="nav-btn"
            style={{ textDecoration: 'none', color: '#111' }}
            onClick={(e) => {
              e.preventDefault();
              logout();
              navigate('login');
            }}
          >
            Salir
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <div className="logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
        <img src="/imagenes/logo.png" alt="Logo de DADO" style={{ width: '32px', height: '32px', borderRadius: '5px' }} />
        <span className="logo-text">DADO</span>
      </div>

      <ul className="nav-links">
        <li>
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
            style={{ fontWeight: currentRoute === 'home' ? 'bold' : 'normal' }}
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="#productos"
            onClick={(e) => {
              e.preventDefault();
              navigate('products');
            }}
            style={{ fontWeight: currentRoute === 'products' ? 'bold' : 'normal' }}
          >
            Productos
          </a>
        </li>
        <li>
          <a
            href="#novedades"
            onClick={(e) => {
              e.preventDefault();
              navigate('products', { filter: 'novedades' });
            }}
          >
            Novedades
          </a>
        </li>
        <li>
          <a
            href="#nosotros"
            onClick={(e) => {
              e.preventDefault();
              navigate('nosotros');
            }}
          >
            Nosotros
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        <a
          href="#carrito"
          className="cart-icon"
          title="Carrito"
          onClick={(e) => {
            e.preventDefault();
            navigate('cart');
          }}
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <i className="ti ti-shopping-cart"></i>
          {totalCartItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#c9a84c',
                color: '#111',
                fontSize: '11px',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {totalCartItems}
            </span>
          )}
        </a>

        {currentUser ? (
          <>
            <span style={{ fontSize: '13px', color: '#333' }}>
              Hola, {currentUser.nombre}
            </span>
            <a
              href="#pedidos"
              className="nav-btn"
              style={{ textDecoration: 'none', color: '#111' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('orders');
              }}
            >
              Mis pedidos
            </a>
            <a
              href="#perfil"
              className="nav-btn"
              style={{ textDecoration: 'none', color: '#111' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('profile');
              }}
            >
              Mi cuenta
            </a>
            {currentUser.rol === 'admin' && (
              <a
                href="#admin"
                className="nav-btn"
                style={{ textDecoration: 'none', color: '#111', background: '#e0c168' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('admin-products');
                }}
              >
                Admin
              </a>
            )}
            <a
              href="#salir"
              className="nav-btn"
              style={{ textDecoration: 'none', color: '#111' }}
              onClick={(e) => {
                e.preventDefault();
                logout();
                navigate('login');
              }}
            >
              Salir
            </a>
          </>
        ) : (
          <a
            href="#login"
            className="nav-btn"
            style={{ textDecoration: 'none', color: '#111' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('login');
            }}
          >
            Iniciar sesión
          </a>
        )}
      </div>
    </nav>
  );
};
