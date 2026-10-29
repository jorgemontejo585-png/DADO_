import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

interface AdminAddProps {
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const AdminAdd: React.FC<AdminAddProps> = ({ navigate }) => {
  const { categories, addProduct } = useStore();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('0');
  const [imagen, setImagen] = useState('');
  const [idCategoria, setIdCategoria] = useState<number>(categories[0]?.id_categoria || 1);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock, 10);

    if (!nombre.trim() || isNaN(precioNum) || precioNum <= 0) {
      setErrorMsg('El nombre y el precio son obligatorios.');
      return;
    }

    addProduct({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioNum,
      stock: isNaN(stockNum) ? 0 : stockNum,
      imagen: imagen.trim() || 'https://picsum.photos/seed/' + encodeURIComponent(nombre.trim()) + '/600/700',
      id_categoria: idCategoria,
    });

    navigate('admin-products');
  };

  return (
    <main className="module-container">
      <h1 className="module-title">Nuevo producto</h1>
      <p className="module-subtitle">Completa la información del producto.</p>

      {errorMsg !== '' && (
        <div className="message message-error">{errorMsg}</div>
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
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              step="0.01"
              min="0"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen">URL de imagen</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              placeholder="https://..."
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="id_categoria">Categoría</label>
            <select
              id="id_categoria"
              name="id_categoria"
              value={idCategoria}
              onChange={(e) => setIdCategoria(Number(e.target.value))}
              required
            >
              {categories.map((c) => (
                <option key={c.id_categoria} value={c.id_categoria}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="module-btn" style={{ width: '100%' }}>
            Guardar producto
          </button>
        </form>
      </div>

      <button
        type="button"
        className="module-btn"
        style={{ background: '#333', color: '#fff' }}
        onClick={() => navigate('admin-products')}
      >
        ← Volver al listado
      </button>
    </main>
  );
};
