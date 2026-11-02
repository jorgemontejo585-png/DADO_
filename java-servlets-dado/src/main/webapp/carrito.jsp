<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="co.edu.cun.dado.model.ItemCarrito" %>
<%
    List<ItemCarrito> carrito = (List<ItemCarrito>) session.getAttribute("carrito");
    Double total = (Double) request.getAttribute("totalCarrito");
    if (total == null) total = 0.0;
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Carrito de Compras - DADO (JSP + Servlets)</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
</head>
<body class="module-page">
<div class="dado-root module-page">

    <nav class="nav">
        <div class="logo">
            <span class="logo-cube">D</span>
            <span class="logo-text">DADO</span>
        </div>
        <ul class="nav-links">
            <li><a href="<%= request.getContextPath() %>/productos">← Seguir comprando</a></li>
        </ul>
    </nav>

    <main class="module-container">
        <h1 class="module-title">Carrito de Compras</h1>
        <p class="module-subtitle">Procesado por CarritoServlet mediante doGet y doPost.</p>

        <% if (carrito != null && !carrito.isEmpty()) { %>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <% for (ItemCarrito item : carrito) { %>
                        <tr>
                            <td><%= item.getProducto().getNombre() %></td>
                            <td>$<%= String.format("%,.0f", item.getProducto().getPrecio()) %></td>
                            <td><%= item.getCantidad() %></td>
                            <td>$<%= String.format("%,.0f", item.getSubtotal()) %></td>
                            <td>
                                <!-- Peticion GET para eliminar item -->
                                <a href="<%= request.getContextPath() %>/carrito?accion=eliminar&id=<%= item.getProducto().getIdProducto() %>" 
                                   style="color:#b71c1c;text-decoration:none;">Eliminar</a>
                            </td>
                        </tr>
                    <% } %>
                </tbody>
            </table>

            <div class="cart-total">
                Total: $<%= String.format("%,.0f", total) %> COP
            </div>
            
            <a href="<%= request.getContextPath() %>/productos" class="module-btn">Continuar comprando</a>
        <% } else { %>
            <div style="text-align:center;padding:40px 0;">
                <h2>Tu carrito está vacío</h2>
                <br>
                <a href="<%= request.getContextPath() %>/productos" class="module-btn">Ver Catálogo</a>
            </div>
        <% } %>
    </main>

    <footer class="footer">
        DADO &copy; 2026 - Módulo Web Java Servlets + JSP
    </footer>
</div>
</body>
</html>
