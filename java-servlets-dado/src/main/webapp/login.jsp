<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión - DADO (JSP + Servlets)</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/styles.css">
</head>
<body class="module-page">
<div class="module-container" style="max-width:500px;padding-top:60px;">
    <h1 class="module-title">Iniciar sesión</h1>
    <p class="module-subtitle">Formulario HTML procesado por LoginServlet vía método POST.</p>

    <% if (request.getAttribute("error") != null) { %>
        <div class="message message-error">
            <%= request.getAttribute("error") %>
        </div>
    <% } %>

    <div class="form-box">
        <!-- Formulario HTML con metodo POST conectado a LoginServlet -->
        <form action="<%= request.getContextPath() %>/login" method="POST">
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" value="admin@boxesya.com" required>
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" value="admin123" required>
            </div>

            <button type="submit" class="module-btn" style="width:100%;">Ingresar</button>
        </form>
        
        <div style="margin-top:15px;font-size:12px;color:#777;">
            Credencial de prueba del docente: <b>admin@boxesya.com</b> / <b>admin123</b>
        </div>
    </div>

    <p style="text-align:center;margin-top:15px;">
        <a href="<%= request.getContextPath() %>/productos" style="color:#c9a84c;">← Volver al catálogo</a>
    </p>
</div>
</body>
</html>
