# DADO - Tienda Streetwear Online

Tienda web de comercio electrónico moderna, rápida y adaptable, construida con React, TypeScript y Vite. Basada en el catálogo y diseño de **DADO Streetwear** (Colombia).

---

## 🚀 Cómo descargar y ejecutar el proyecto en tu computadora

### Requisitos previos
- Tener instalado **Node.js** (versión 18 o superior). Puedes descargarlo gratis desde [nodejs.org](https://nodejs.org/).

### Pasos de instalación y ejecución

1. **Descargar el código:**
   - En la parte superior de Google AI Studio, haz clic en el menú (tres puntos o botón de exportar) y selecciona **Export** o **Download code (.zip)**.
   - Descomprime el archivo `.zip` en tu carpeta preferida (por ejemplo en tu Escritorio o en Documentos).

2. **Abrir la terminal en la carpeta del proyecto:**
   - Abre la carpeta descomprimida en tu explorador de archivos.
   - Haz clic derecho en un área vacía y selecciona **Abrir en Terminal** (o abre Visual Studio Code en esa carpeta).

3. **Instalar dependencias (solo la primera vez):**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   O si estás en Windows, haz doble clic en el archivo `iniciar.bat`.

5. **Abrir en tu navegador:**
   - La terminal te dará el enlace:
     `http://localhost:3000/`

---

## 🔑 Credenciales de Acceso

- **Administrador:**
  - **Correo:** `admin@boxesya.com`
  - **Contraseña:** `admin123`
  - *Permisos:* Gestionar catálogo, agregar productos, editar precios, stock, imágenes y cambiar estado (Activo/Inactivo).

- **Clientes:**
  - Puedes registrar cualquier usuario nuevo desde la pestaña **Registrarme** o usar una cuenta de prueba creada en el momento.

---

## 📦 Estructura del Proyecto

```text
├── index.html               # Punto de entrada HTML con iconos Tabler y CSS
├── package.json             # Dependencias y scripts de ejecución
├── tsconfig.json            # Configuración de TypeScript
├── vite.config.ts           # Configuración del servidor Vite (puerto 3000)
├── css/
│   └── styles.css           # Estilos originales y responsivos de DADO
├── imagenes/
│   └── logo.png             # Logo oficial en cubo dorado
├── BoxesYa.sql              # Respaldo original de la base de datos MySQL
└── src/
    ├── main.tsx             # Inicialización de React
    ├── App.tsx              # Enrutador principal y layout
    ├── types.ts             # Definición de tipos TypeScript (Producto, Carrito, Pedido, Usuario)
    ├── data/
    │   └── initialData.ts   # Catálogo inicial sembrado desde BoxesYa.sql
    ├── context/
    │   └── StoreContext.tsx # Estado global, carrito, pedidos, inventario y persistencia local
    ├── components/
    │   ├── Nav.tsx          # Barra de navegación principal y admin
    │   └── Footer.tsx       # Pie de página
    └── pages/
        ├── Home.tsx         # Portada, colecciones destacadas y trust bar
        ├── Products.tsx     # Catálogo con buscador y filtros por categoría
        ├── ProductDetail.tsx# Detalle, control de stock y botón de compra
        ├── Cart.tsx         # Carrito con edición de cantidades y subtotales
        ├── Checkout.tsx     # Pasarela y confirmación con método de pago
        ├── Orders.tsx       # Historial de pedidos
        ├── Profile.tsx      # Gestión de perfil del usuario
        ├── Login.tsx        # Inicio de sesión con validación de contraseña
        ├── Register.tsx     # Registro de nuevos clientes
        ├── Nosotros.tsx     # Sección institucional
        └── admin/
            ├── AdminProducts.tsx # Tabla de administración de inventario
            ├── AdminAdd.tsx      # Formulario de nuevo producto
            └── AdminEdit.tsx     # Edición de producto existente
```

---

## 🛠️ Tecnologías Utilizadas

- **React 18**: Construcción de interfaces interactivas por componentes.
- **TypeScript**: Tipado estático y robustez en la gestión de datos.
- **Vite**: Empaquetador ultra rápido con Hot Module Replacement.
- **Tabler Icons**: Iconografía moderna para la tienda.
- **LocalStorage API**: Persistencia automática de productos, carrito, usuarios y compras en el navegador.
