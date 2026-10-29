import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface LoginProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Completa todos los campos.');
      return;
    }
    const success = login(email.trim());
    if (success) {
      navigate('home');
    } else {
      setErrorMsg('Correo o contraseña incorrectos.');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    login(demoEmail);
    navigate('home');
  };

  return (
    <div className="module-page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="module-container" style={{ maxWidth: '500px' }}>
        <h1 className="module-title">Iniciar sesión</h1>
        <p className="module-subtitle">Ingresa a tu cuenta de DADO.</p>

        {errorMsg !== '' && (
          <div className="message message-error">{errorMsg}</div>
        )}

        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@boxesya.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="module-btn" style={{ width: '100%' }}>
              Iniciar sesión
            </button>
          </form>

          <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #222' }}>
            <span style={{ fontSize: '11px', color: '#777', display: 'block', marginBottom: '8px' }}>
              Acceso rápido de prueba:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="module-btn"
                style={{ fontSize: '11px', padding: '6px 10px', background: '#333', color: '#ffd700' }}
                onClick={() => handleQuickLogin('admin@boxesya.com')}
              >
                Cuenta Administrador
              </button>
              <button
                type="button"
                className="module-btn"
                style={{ fontSize: '11px', padding: '6px 10px', background: '#333', color: '#ccc' }}
                onClick={() => handleQuickLogin('cliente@dado.co')}
              >
                Cuenta Cliente
              </button>
            </div>
          </div>
        </div>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          ¿No tienes una cuenta?{' '}
          <a
            href="#registro"
            style={{ color: '#c9a84c', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('register');
            }}
          >
            Regístrate aquí
          </a>
        </p>

        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          <a
            href="#inicio"
            style={{ color: '#c9a84c', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
          >
            ← Volver al inicio
          </a>
        </p>
      </div>
    </div>
  );
};
