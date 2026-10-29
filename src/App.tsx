import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Nosotros } from './pages/Nosotros';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminAdd } from './pages/admin/AdminAdd';
import { AdminEdit } from './pages/admin/AdminEdit';

export const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  const navigate = (route: string, params: Record<string, any> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Support browser hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      if (hash === 'productos' || hash === 'todas') {
        navigate('products');
      } else if (hash.startsWith('categoria-')) {
        const catId = parseInt(hash.replace('categoria-', ''), 10);
        navigate('products', { category: catId });
      } else if (hash === 'carrito') {
        navigate('cart');
      } else if (hash === 'pedidos') {
        navigate('orders');
      } else if (hash === 'perfil') {
        navigate('profile');
      } else if (hash === 'login') {
        navigate('login');
      } else if (hash === 'admin' || hash === 'admin-productos') {
        navigate('admin-products');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdminRoute = currentRoute.startsWith('admin');
  const { currentUser } = useStore();

  return (
    <div className={`dado-root ${currentRoute !== 'home' ? 'module-page' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav currentRoute={currentRoute} navigate={navigate} isAdmin={isAdminRoute} />

      <div style={{ flex: 1 }}>
        {isAdminRoute && currentUser?.rol !== 'admin' ? (
          <main className="module-container" style={{ maxWidth: '500px' }}>
            <div className="message message-error">
              Acceso restringido: Debes iniciar sesión con una cuenta de administrador para acceder a este panel.
            </div>
            <Login navigate={navigate} />
          </main>
        ) : (
          <>
            {currentRoute === 'home' && <Home navigate={navigate} />}
            {currentRoute === 'products' && <Products navigate={navigate} initialCategory={routeParams.category || 0} />}
            {currentRoute === 'product-detail' && <ProductDetail productId={routeParams.id} navigate={navigate} />}
            {currentRoute === 'cart' && <Cart navigate={navigate} />}
            {currentRoute === 'checkout' && <Checkout navigate={navigate} />}
            {currentRoute === 'orders' && <Orders navigate={navigate} />}
            {currentRoute === 'profile' && <Profile navigate={navigate} />}
            {currentRoute === 'login' && <Login navigate={navigate} />}
            {currentRoute === 'register' && <Register navigate={navigate} />}
            {currentRoute === 'nosotros' && <Nosotros navigate={navigate} />}
            {currentRoute === 'admin-products' && <AdminProducts navigate={navigate} />}
            {currentRoute === 'admin-add' && <AdminAdd navigate={navigate} />}
            {currentRoute === 'admin-edit' && <AdminEdit productId={routeParams.id} navigate={navigate} />}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
