import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface ProfileProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const Profile: React.FC<ProfileProps> = ({ navigate }) => {
  const { currentUser, updateProfile, logout, flashMessage } = useStore();

  const [nombre, setNombre] = useState(currentUser?.nombre || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [telefono, setTelefono] = useState(currentUser?.telefono || '');
  const [direccion, setDireccion] = useState(currentUser?.direccion || '');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [localMsg, setLocalMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!currentUser) {
    return (
      <main className="module-container">
        <div className="message message-error">Debes iniciar sesión para ver tu perfil.</div>
        <button type="button" className="module-btn" onClick={() => navigate('login')}>
          Iniciar sesión
        </button>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      setLocalMsg({ text: 'El nombre y el correo son obligatorios.', type: 'error' });
      return;
    }
    updateProfile({
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      direccion: direccion.trim(),
    });
    setLocalMsg({ text: 'Perfil actualizado correctamente.', type: 'success' });
    setPasswordNueva('');
  };

  return (
    <main className="module-container">
      <h1 className="module-title">Mi perfil</h1>
      <p className="module-subtitle">Actualiza tus datos personales</p>

      {localMsg && (
        <div className={`message message-${localMsg.type}`}>
          {localMsg.text}
        </div>
      )}
      {flashMessage && !localMsg && (
        <div className={`message message-${flashMessage.type}`}>
          {flashMessage.text}
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

          <div className="form-group">
            <label htmlFor="password_nueva">Nueva contraseña (dejar vacío para no cambiar)</label>
            <input
              type="password"
              id="password_nueva"
              name="password_nueva"
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
            />
          </div>

          <button type="submit" className="module-btn" style={{ width: '100%' }}>
            Guardar cambios
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '500px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p>
          <a
            href="#pedidos"
            style={{ color: '#c9a84c', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('orders');
            }}
          >
            Ver mis pedidos →
          </a>
        </p>
        <p>
          <a
            href="#salir"
            style={{ color: '#c9a84c', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              logout();
              navigate('login');
            }}
          >
            Cerrar sesión
          </a>
        </p>
        <p>
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
    </main>
  );
};
