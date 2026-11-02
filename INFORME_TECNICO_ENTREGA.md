# INFORME TÉCNICO DE CONSTRUCCIÓN Y CODIFICACIÓN DE SOFTWARE
## MÓDULO WEB CON JAVA SERVLETS, JSP Y CONTROLADORES HTTP (GET / POST)

---

**Programa de Formación:** Análisis y Desarrollo de Software (ADSO) / Ingeniería de Software  
**Institución:** CUN / SENA  
**Estudiante:** Jorge Montejo  
**Proyecto:** DADO - Sistema de Comercio Electrónico Streetwear  
**Módulo Desarrollado:** Módulo de Gestión de Catálogo, Carrito de Compras y Control de Acceso  
**Tecnologías:** Java (Jakarta EE / Java EE), Servlets (HTTP GET/POST), JSP (JavaServer Pages), JDBC y MySQL  
**Herramienta de Versionamiento:** Git / GitHub (`jorgemontejo585-png/DADO`)  

---

## 1. INTRODUCCIÓN Y OBJETIVOS

El presente informe documenta la codificación del módulo web del proyecto de comercio electrónico **DADO**, implementando la arquitectura MVC (Modelo - Vista - Controlador) mediante la tecnología de **Java Servlets** y **JSP (JavaServer Pages)**, en concordancia con los artefactos de diseño previamente elaborados (Diagrama de Casos de Uso, Diagrama de Clases, Modelo Entidad-Relación y Prototipos UI).

### Objetivos Específicos:
- Implementar la capa de persistencia conectando a la base de datos MySQL (`boxesya_db`) mediante el patrón DAO y JDBC.
- Construir controladores web mediante **Java Servlets**, gestionando de forma explícita las peticiones HTTP a través de los métodos **`doGet`** y **`doPost`**.
- Diseñar interfaces dinámicas con **JSP**, consumiendo atributos de petición (`request.getAttribute`) y sesión (`session.getAttribute`).
- Integrar formularios HTML interactivos con validación de datos hacia el servidor.

---

## 2. ARQUITECTURA DEL SISTEMA Y PATRÓN MVC

El módulo implementa un desacoplamiento claro de responsabilidades:

1. **Modelo (Model):** 
   - Clases JavaBeans (`Producto.java`, `Usuario.java`, `ItemCarrito.java`) que encapsulan los datos y reglas de negocio.
   - Capa de acceso a datos (`Conexion.java`, `ProductoDAO.java`, `UsuarioDAO.java`) que ejecuta las sentencias SQL preparadas (`PreparedStatement`) para evitar inyección SQL.

2. **Controlador (Controller - Servlets):**
   - `ProductoServlet.java`: Atiende peticiones para listar, filtrar, consultar y actualizar productos del inventario.
   - `CarritoServlet.java`: Controla la adición, cálculo de subtotales y eliminación de artículos en la sesión del cliente.
   - `LoginServlet.java`: Gestiona la autenticación segura y el cierre de sesión (`session.invalidate()`).

3. **Vista (View - JSP):**
   - `productos.jsp`: Catálogo dinámico con filtro de categorías.
   - `carrito.jsp`: Tabla de compras y totales en tiempo real.
   - `login.jsp`: Formulario de inicio de sesión con mensajes de error.
   - `admin-productos.jsp`: Panel administrativo con formulario POST para registro y tabla con acciones GET.

---

## 3. IMPLEMENTACIÓN DE MÉTODOS HTTP (`GET` y `POST`)

Tal como lo estipula la guía técnica del componente formativo, se diferenciaron claramente los propósitos de cada método:

### 3.1 Método `GET` (`doGet` en Servlets)
Se utilizó exclusivamente para operaciones de **consulta, lectura de recursos y navegación**:
- **Filtrado de productos por categoría:** El formulario en `productos.jsp` envía la categoría seleccionada mediante `method="GET"` (`/productos?categoria=1`).
- **Consulta de detalle de producto:** Lectura del identificador mediante `request.getParameter("id")`.
- **Eliminación y cambio de estado:** `CarritoServlet?accion=eliminar&id=X` y `ProductoServlet?accion=cambiar-estado&id=X`.
- **Despacho a vistas:** Uso de `RequestDispatcher.forward(request, response)` para enviar colecciones hacia los JSP.

### 3.2 Método `POST` (`doPost` en Servlets)
Se utilizó para operaciones que **modifican el estado del sistema o transmiten información sensible**:
- **Autenticación en `LoginServlet`:** Envío de correo y contraseña en el cuerpo de la petición HTTP (`request.getParameter("email")`, `request.getParameter("password")`) sin exponer credenciales en la URL.
- **Creación de productos en `admin-productos.jsp`:** Formulario HTML con `method="POST"` que envía nombre, precio, stock, descripción e imagen hacia `/admin/guardar-producto`.
- **Adición al carrito en `productos.jsp`:** Formulario que transmite de forma atómica el identificador del producto y la cantidad deseada.
- **Patrón Post-Redirect-Get (PRG):** Uso de `response.sendRedirect(...)` tras un POST exitoso para evitar el reenvío accidental de formularios al refrescar la página.

---

## 4. ESTRUCTURA DEL PROYECTO (MAVEN + SERVLETS)

```text
java-servlets-dado/
├── pom.xml                                      # Descriptor de dependencias Maven
└── src/
    └── main/
        ├── java/
        │   └── co/edu/cun/dado/
        │       ├── config/
        │       │   └── Conexion.java            # Conexión JDBC a MySQL (BoxesYa.sql)
        │       ├── model/
        │       │   ├── Producto.java            # Entidad Producto
        │       │   ├── Usuario.java             # Entidad Usuario
        │       │   └── ItemCarrito.java         # Objeto de compra en memoria
        │       ├── dao/
        │       │   ├── ProductoDAO.java         # Operaciones CRUD sobre la tabla 'productos'
        │       │   └── UsuarioDAO.java          # Validación de usuarios y registro
        │       └── servlet/
        │           ├── ProductoServlet.java     # Controlador GET (catálogo) y POST (crear/editar)
        │           ├── CarritoServlet.java      # Controlador GET (ver/eliminar) y POST (agregar)
        │           └── LoginServlet.java        # Controlador POST (autenticar) y GET (logout)
        └── webapp/
            ├── WEB-INF/
            │   └── web.xml                      # Descriptor de despliegue Jakarta EE
            ├── css/
            │   └── styles.css                   # Hoja de estilos original de DADO
            ├── index.jsp                        # Redirección inicial hacia el servlet
            ├── productos.jsp                    # Vista JSP del catálogo con filtro GET
            ├── carrito.jsp                      # Vista JSP del carrito con resumen
            ├── login.jsp                        # Vista JSP con formulario POST de inicio de sesión
            └── admin-productos.jsp              # Vista JSP de administración (POST y GET)
```

---

## 5. GUÍA DE EJECUCIÓN Y PRUEBAS PARA EL EVALUADOR

1. **Base de Datos:** Importar el archivo `BoxesYa.sql` en MySQL (por defecto en localhost puerto 3306, base de datos `boxesya_db`).
2. **Entorno de Desarrollo:** Abrir la carpeta `java-servlets-dado` en **NetBeans**, **Eclipse** o **IntelliJ IDEA**.
3. **Servidor de Aplicaciones:** Desplegar sobre **Apache Tomcat** (versión 9 o 10).
4. **Credenciales de prueba del sistema:**
   - **Administrador:** `admin@boxesya.com` | Contraseña: `admin123`
   - **Catálogo público:** Acceso directo sin autenticación previa.
