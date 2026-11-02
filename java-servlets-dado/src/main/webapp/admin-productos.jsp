<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="co.edu.cun.dado.model.Producto" %>
<%@ page import="co.edu.cun.dado.model.Usuario" %>
<%
    Usuario usuarioLogueado = (Usuario) session.getAttribute("usuarioLogueado");
    if (usuarioLogueado == null || !"admin".equalsIgnoreCase(usuarioLogueado.getRol())) {
        response.sendRedirect(request.getContextPath() + "/login.jsp");
        return;
    }
    List<Producto> productos = (List<Producto>) request.getAttribute("productos");
    String mensaje = (String) session.getAttribute("mensaje");
    session.removeAttribute("mensaje");
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración - DADO (JSP + Servlets)</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/styles.css">
</head>
<body class="module-page">
<div class="dado-root module-page">

    <nav class="nav">
        <div class="logo">
            <span class="logo-cube">D</span>
            <span class="logo-text">DADO ADMIN</span>
        </div>
        <ul class="nav-links">
            <li><a href="<%= request.getContextPath() %>/productos">Ver Tienda</a></li>
            <li><a href="<%= request.getContextPath() %>/logout">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <main class="module-container">
        <h1 class="module-title">Administración de Productos</h1>
        <p class="module-subtitle">Formulario de registro (POST) y listado interactivo (GET) gestionado con ProductoServlet.</p>

        <% if (mensaje != null) { %>
            <div class="message message-success"><%= mensaje %></div>
        <% } %>

        <!-- FORMULARIO HTML CON METODO POST PARA CREAR NUEVO PRODUCTO -->
        <div class="form-box" style="max-width:100%;margin-bottom:30px;">
            <h3 style="color:#c9a84c;margin-bottom:15px;">Registrar Nuevo Producto (Método POST a ProductoServlet)</h3>
            <form action="<%= request.getContextPath() %>/admin/guardar-producto" method="POST" style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
                <input type="hidden" name="id_producto" value="0">
                
                <div class="form-group">
                    <label>Nombre del Producto:</label>
                    <input type="text" name="nombre" placeholder="Ej: Hoodie Negro Street" required>
                </div>
                
                <div class="form-group">
                    <label>Categoría:</label>
                    <select name="id_categoria" required>
                        <option value="1">Camisetas</option>
                        <option value="2">Chaquetas</option>
                        <option value="3">Pantalones</option>
                        <option value="4">Accesorios</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Precio (COP):</label>
                    <input type="number" step="0.01" name="precio" placeholder="89900" required>
                </div>

                <div class="form-group">
                    <label>Stock inicial:</label>
                    <input type="number" name="stock" placeholder="25" required>
                </div>

                <div class="form-group" style="grid-column:span 2;">
                    <label>Descripción:</label>
                    <textarea name="descripcion" rows="2" placeholder="Detalles de tela, corte y diseño..." required></textarea>
                </div>

                <div class="form-group" style="grid-column:span 2;">
                    <label>URL Imagen:</label>
                    <input type="text" name="imagen" placeholder="https://picsum.photos/seed/dado/600/700">
                </div>

                <div style="grid-column:span 2;">
                    <button type="submit" class="module-btn" style="width:100%;">Guardar Producto en Base de Datos</button>
                </div>
            </form>
        </div>

        <!-- TABLA DE PRODUCTOS (METODO GET) -->
        <h3 style="color:#fff;margin-bottom:15px;">Catálogo Actual Registrado</h3>
        <table class="cart-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <% if (productos != null && !productos.isEmpty()) {
                    for (Producto p : productos) { %>
                    <tr>
                        <td>#<%= p.getIdProducto() %></td>
                        <td><%= p.getNombre() %></td>
                        <td><%= p.getNombreCategoria() != null ? p.getNombreCategoria() : "—" %></td>
                        <td>$<%= String.format("%,.0f", p.getPrecio()) %></td>
                        <td><%= p.getStock() %></td>
                        <td><%= p.isActivo() ? "<span style='color:#256029;'>Activo</span>" : "<span style='color:#b71c1c;'>Inactivo</span>" %></td>
                        <td>
                            <!-- Accion GET para cambiar estado -->
                            <a href="<%= request.getContextPath() %>/admin/productos?accion=cambiar-estado&id=<%= p.getIdProducto() %>&estado=<%= !p.isActivo() %>"
                               style="color:#c9a84c;text-decoration:none;">
                                <%= p.isActivo() ? "Desactivar" : "Reactivar" %>
                            </a>
                        </td>
                    </tr>
                <%  }
                   } %>
            </tbody>
        </table>
    </main>
</div>
</body>
</html>
