import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

interface AdminEditProps {
  productId: number;
  navigate: (route: string, params?: Record<string, any>) => void;
}

export const AdminEdit: React.FC<AdminEditProps> = ({ productId, navigate }) => {
  const { products, categories, updateProduct } = useStore();

  const producto = products.find((p) => p.id_producto === productId);

  const [nombre, setNombre] = useState(producto?.nombre || '');
  const [descripcion, setDescripcion] = useState(producto?.descripcion || '');
  const [precio, setPrecio] = useState(producto ? String(producto.precio) : '0');
  const [stock, setStock] = useState(producto ? String(producto.stock) : '0');
  const [imagen, setImagen] = useState(producto?.imagen || '');
  const [idCategoria, setIdCategoria] = useState<number>(producto?.id_categoria || 1);
  const [errorMsg, setErrorMsg] = useState('');

  if (!producto) {
    return (
      <main className="module-container">
        <div className="message message-error">Producto no encontrado.</div>
        <button type="button" className="module-btn" onClick={() => navigate('admin-products')}>
          ← Volver al listado
        </button>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock, 10);

    if (!nombre.trim() || isNaN(precioNum) || precioNum <= 0) {
      setErrorMsg('El nombre y el precio son obligatorios.');
      return;
    }

    updateProduct(producto.id_producto, {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioNum,
      stock: isNaN(stockNum) ? 0 : stockNum,
      imagen: imagen.trim(),
      id_categoria: idCategoria,
    });

    navigate('admin-products');
  };

  return (
    <main className="module-container">
      <h1 className="module-title">Editar producto</h1>
      <p className="module-subtitle">
        #{producto.id_producto} — {producto.nombre}
      </p>

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
            Guardar cambios
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
