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

  // Convert route and params into a URL hash string
  const routeToHash = (route: string, params: Record<string, any> = {}) => {
    if (route === 'home') return '';
    if (route === 'products') {
      if (params.category) return `categoria-${params.category}`;
      if (params.filter) return 'novedades';
      return 'productos';
    }
    if (route === 'product-detail') return `producto-${params.id}`;
    if (route === 'cart') return 'carrito';
    if (route === 'checkout') return 'checkout';
    if (route === 'orders') return 'pedidos';
    if (route === 'profile') return 'perfil';
    if (route === 'login') return 'login';
    if (route === 'register') return 'registro';
    if (route === 'nosotros') return 'nosotros';
    if (route === 'admin-products') return 'admin-productos';
    if (route === 'admin-add') return 'admin-agregar';
    if (route === 'admin-edit') return `admin-editar-${params.id}`;
    return route;
  };

  // Convert URL hash into route and params
  const parseHash = (hashStr: string) => {
    const hash = hashStr.replace(/^#\/?/, '').trim();
    if (!hash || hash === 'inicio' || hash === 'sitio') {
      return { route: 'home', params: {} };
    }
    if (hash === 'productos' || hash === 'todas') {
      return { route: 'products', params: {} };
    }
    if (hash === 'novedades') {
      return { route: 'products', params: { filter: 'novedades' } };
    }
    if (hash.startsWith('categoria-')) {
      const catId = parseInt(hash.replace('categoria-', ''), 10);
      return { route: 'products', params: { category: catId } };
    }
    if (hash.startsWith('producto-')) {
      const prodId = parseInt(hash.replace('producto-', ''), 10);
      return { route: 'product-detail', params: { id: prodId } };
    }
    if (hash === 'carrito') return { route: 'cart', params: {} };
    if (hash === 'checkout') return { route: 'checkout', params: {} };
    if (hash === 'pedidos') return { route: 'orders', params: {} };
    if (hash === 'perfil') return { route: 'profile', params: {} };
    if (hash === 'login') return { route: 'login', params: {} };
    if (hash === 'registro') return { route: 'register', params: {} };
    if (hash === 'nosotros') return { route: 'nosotros', params: {} };
    if (hash === 'admin' || hash === 'admin-productos') return { route: 'admin-products', params: {} };
    if (hash === 'admin-agregar') return { route: 'admin-add', params: {} };
    if (hash.startsWith('admin-editar-')) {
      const editId = parseInt(hash.replace('admin-editar-', ''), 10);
      return { route: 'admin-edit', params: { id: editId } };
    }
    return { route: 'home', params: {} };
  };

  const navigate = (route: string, params: Record<string, any> = {}, pushHistory = true) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory) {
      const newHash = routeToHash(route, params);
      const urlWithHash = newHash ? `#${newHash}` : window.location.pathname;
      if (window.location.hash !== (newHash ? `#${newHash}` : '')) {
        window.history.pushState({ route, params }, '', urlWithHash);
      }
    }
  };

  // Support browser back/forward buttons (popstate and hashchange)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.route) {
        navigate(e.state.route, e.state.params || {}, false);
      } else {
        const parsed = parseHash(window.location.hash);
        navigate(parsed.route, parsed.params, false);
      }
    };

    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      navigate(parsed.route, parsed.params, false);
    };

    // Initial load from URL hash
    if (window.location.hash) {
      const initial = parseHash(window.location.hash);
      navigate(initial.route, initial.params, false);
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
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
