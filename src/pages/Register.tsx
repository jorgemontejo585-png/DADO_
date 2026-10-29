import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface RegisterProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Register: React.FC<RegisterProps> = ({ navigate }) => {
  const { register } = useStore();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !password) {
      setFeedback({ text: 'Por favor completa los campos obligatorios.', type: 'error' });
      return;
    }
    if (password.length < 6) {
      setFeedback({ text: 'La contraseña debe tener al menos 6 caracteres.', type: 'error' });
      return;
    }

    const result = register({
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      direccion: direccion.trim(),
    });

    if (result.success) {
      setFeedback({ text: result.message, type: 'success' });
      setTimeout(() => {
        navigate('home');
      }, 1200);
    } else {
      setFeedback({ text: result.message, type: 'error' });
    }
  };

  return (
    <div className="module-page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="module-container" style={{ maxWidth: '500px' }}>
        <h1 className="module-title">Crear cuenta</h1>
        <p className="module-subtitle">Únete a DADO en unos segundos.</p>

        {feedback && (
          <div className={`message message-${feedback.type}`}>
            {feedback.text}
          </div>
        )}

        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>

            <button type="submit" className="module-btn" style={{ width: '100%' }}>
              Registrarme
            </button>
          </form>
        </div>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          ¿Ya tienes una cuenta?{' '}
          <a
            href="#login"
            style={{ color: '#c9a84c', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('login');
            }}
          >
            Iniciar sesión
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
