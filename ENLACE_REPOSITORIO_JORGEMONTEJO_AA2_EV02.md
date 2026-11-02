# SERVICIO NACIONAL DE APRENDIZAJE - SENA / CUN
## EVIDENCIA DE APRENDIZAJE: AA2_EV02
### "Codificación de módulos del software web utilizando Servlets y JSP"

---

### INFORMACIÓN DEL APRENDIZ Y DE LA ENTREGA

- **Nombre del Aprendiz:** JORGE MONTEJO
- **Correo Institucional:** jorge.montejo@cun.edu.co
- **Nombre de la Evidencia:** AA2_EV02 - Codificación de módulos web con Servlets y JSP
- **Nombre de la Entrega:** `JORGEMONTEJO_AA2_EV02`
- **Nombre del Proyecto:** DADO - Plataforma de Comercio Electrónico Streetwear
- **Fecha de Entrega:** 1 de Noviembre de 2026

---

### ENLACE DEL REPOSITORIO DE CONTROL DE VERSIONES (GIT / GITHUB)

- 🔗 **URL del Repositorio en GitHub:**
  [https://github.com/jorgemontejo585-png/DADO](https://github.com/jorgemontejo585-png/DADO)

- 🌐 **URL de Despliegue en Línea (Demostración Web):**
  [https://ais-dev-6zix5ltl27xrtyhiv5c62m-897439782714.us-east1.run.app](https://ais-dev-6zix5ltl27xrtyhiv5c62m-897439782714.us-east1.run.app)

---

### DESCRIPCIÓN TÉCNICA DEL MÓDULO CODIFICADO

En cumplimiento con los requerimientos de la guía de aprendizaje:

1. **Servlets y Métodos HTTP Implementados:**
   - **`ProductoServlet.java`**:
     - Método `doGet()`: Consulta de catálogo, filtrado dinámico por categoría (`categoria=1, 2, 3, 4`), visualización detallada del producto y listado administrativo.
     - Método `doPost()`: Procesamiento de formularios de creación y actualización de prendas en el inventario hacia la base de datos.
   - **`CarritoServlet.java`**:
     - Método `doGet()`: Recuperación de la sesión del carrito de compras y eliminación de productos por parámetro (`accion=eliminar&id=X`).
     - Método `doPost()`: Adición de artículos y cantidades al carrito del cliente.
   - **`LoginServlet.java`**:
     - Método `doPost()`: Validación segura de credenciales de usuario y administrador.
     - Método `doGet()`: Cierre de sesión e invalidación de tokens (`session.invalidate()`).

2. **Vistas Dinámicas JSP (`JavaServer Pages`):**
   - `productos.jsp`: Contiene el formulario HTML con método `GET` para filtros de categoría y formularios con método `POST` para agregar artículos al carrito.
   - `carrito.jsp`: Tabla de cálculo de subtotales, totales y opciones de vaciado.
   - `login.jsp`: Formulario HTML con método `POST` para autenticación con mensajes de alerta.
   - `admin-productos.jsp`: Interfaz de gestión de inventario con formulario HTML completo con método `POST` para inserción y enlaces `GET` para reactivación y desactivación lógica.

3. **Base de Datos y Persistencia:**
   - **Script SQL:** `BoxesYa.sql` (tablas `productos`, `categorias`, `usuarios`, `pedidos`, `detalle_pedido`, `pagos`).
   - **Conectividad:** JDBC (`mysql-connector-j`) mediante `Conexion.java` y patrón DAO (`ProductoDAO.java`, `UsuarioDAO.java`) con sentencias preparadas contra inyección SQL.

---

### CREDENCIALES DE ACCESO PARA EVALUACIÓN DEL DOCENTE

- **Rol Administrador:**
  - Correo: `admin@boxesya.com`
  - Contraseña: `admin123`
- **Rol Cliente:** Registro libre mediante formulario o navegación en el catálogo público.
