<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="co.edu.cun.dado.model.Producto" %>
<%@ page import="co.edu.cun.dado.model.Usuario" %>
<%
    Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");
    List<Producto> productos = (List<Producto>) request.getAttribute("productos");
    Integer categoriaSel = (Integer) request.getAttribute("categoriaSeleccionada");
    if (categoriaSel == null) categoriaSel = 0;
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DADO - Catálogo de Productos (JSP + Servlets)</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body class="module-page">
<div class="dado-root module-page">

    <!-- Navegacion -->
    <nav class="nav">
        <div class="logo">
            <span class="logo-cube">D</span>
            <span class="logo-text">DADO</span>
        </div>
        <ul class="nav-links">
            <li><a href="<%= request.getContextPath() %>/index.jsp">Inicio</a></li>
            <li><a href="<%= request.getContextPath() %>/productos" style="font-weight:bold;">Productos</a></li>
        </ul>
        <div class="nav-actions">
            <a href="<%= request.getContextPath() %>/carrito" class="cart-icon" title="Carrito">
                <i class="ti ti-shopping-cart"></i>
            </a>
            <% if (usuarioLogueado != null) { %>
                <span style="font-size:13px;color:#333;">Hola, <%= usuarioLogueado.getNombre() %></span>
                <% if ("admin".equalsIgnoreCase(usuarioLogueado.getRol())) { %>
                    <a href="<%= request.getContextPath() %>/admin/productos" class="nav-btn" style="text-decoration:none;color:#111;">Admin</a>
                <% } %>
                <a href="<%= request.getContextPath() %>/logout" class="nav-btn" style="text-decoration:none;color:#111;">Salir</a>
            <% } else { %>
                <a href="<%= request.getContextPath() %>/login.jsp" class="nav-btn" style="text-decoration:none;color:#111;">Iniciar sesión</a>
            <% } %>
        </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="module-container">
        <h1 class="module-title">Catálogo Streetwear</h1>
        <p class="module-subtitle">Modulo codificado en Java Servlets con metodos GET y vistas JSP.</p>

        <!-- Formulario con Metodo GET para filtrado de productos -->
        <form action="<%= request.getContextPath() %>/productos" method="GET" style="margin-bottom:24px;display:flex;gap:10px;align-items:center;">
            <label style="color:#777;font-size:13px;">Filtrar por categoría:</label>
            <select name="categoria" onchange="this.form.submit()" style="padding:8px 12px;background:#1e1e1e;color:white;border:1px solid #333;border-radius:4px;">
                <option value="0" <%= categoriaSel == 0 ? "selected" : "" %>>Todas las colecciones</option>
                <option value="1" <%= categoriaSel == 1 ? "selected" : "" %>>Camisetas</option>
                <option value="2" <%= categoriaSel == 2 ? "selected" : "" %>>Chaquetas</option>
                <option value="3" <%= categoriaSel == 3 ? "selected" : "" %>>Pantalones</option>
                <option value="4" <%= categoriaSel == 4 ? "selected" : "" %>>Accesorios</option>
            </select>
            <noscript><button type="submit" class="module-btn">Filtrar</button></noscript>
        </form>

        <div class="products-grid">
            <% if (productos != null && !productos.isEmpty()) {
                for (Producto p : productos) { %>
                <div class="product-card">
                    <div class="product-name"><%= p.getNombre() %></div>
                    <p style="color:#777; font-size:12px; margin-bottom:10px;"><%= p.getDescripcion() %></p>
                    <div class="product-price">$<%= String.format("%,.0f", p.getPrecio()) %> COP</div>
                    <div class="product-stock">Stock disponible: <%= p.getStock() %></div>
                    
                    <!-- Formulario con Metodo POST para agregar al carrito -->
                    <form action="<%= request.getContextPath() %>/carrito" method="POST" style="margin-top:10px;">
                        <input type="hidden" name="id_producto" value="<%= p.getIdProducto() %>">
                        <input type="hidden" name="cantidad" value="1">
                        <button type="submit" class="module-btn" style="width:100%;">Agregar al Carrito</button>
                    </form>
                </div>
            <%  }
               } else { %>
                <p style="color:#777;">No hay productos disponibles en esta categoría.</p>
            <% } %>
        </div>
    </main>

    <footer class="footer">
        DADO &copy; 2026 - Módulo Web Java Servlets + JSP (CUN / SENA)
    </footer>
</div>
</body>
</html>
