import React from 'react';

interface NosotrosProps {
  navigate: (route: string) => void;
}

export const Nosotros: React.FC<NosotrosProps> = ({ navigate }) => {
  return (
    <main className="module-container" style={{ maxWidth: '800px' }}>
      <h1 className="module-title">Sobre DADO</h1>
      <p className="module-subtitle">Streetwear urbano con identidad colombiana y alcance global.</p>

      <div className="form-box" style={{ maxWidth: '100%', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '15px', color: '#ccc' }}>
          En <strong>DADO</strong> redefinimos la moda urbana en Colombia. Nacimos con la visión de llevar prendas exclusivas, telas de alta durabilidad y diseños conceptuales a quienes buscan destacar sin comprometer la comodidad.
        </p>
        <p style={{ marginBottom: '15px', color: '#ccc' }}>
          Nuestra colección incluye camisetas oversize, chaquetas bomber térmicas, jeans cargo reforzados y accesorios diseñados con atención al más mínimo detalle.
        </p>
        <div style={{ marginTop: '20px' }}>
          <button type="button" className="module-btn" onClick={() => navigate('products')}>
            Explorar catálogo
          </button>
        </div>
      </div>
    </main>
  );
};
