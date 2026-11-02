package co.edu.cun.dado.servlet;

import co.edu.cun.dado.dao.UsuarioDAO;
import co.edu.cun.dado.model.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

/**
 * Servlet LoginServlet: Procesa inicio y cierre de sesion con doPost y doGet.
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/login", "/logout"})
public class LoginServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO;

    @Override
    public void init() throws ServletException {
        usuarioDAO = new UsuarioDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        if ("/logout".equals(request.getServletPath())) {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            response.sendRedirect(request.getContextPath() + "/login.jsp");
            return;
        }

        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        // Autenticar con BD o credencial por defecto para el docente
        Usuario u = usuarioDAO.autenticar(email, password);

        if (u == null && "admin@boxesya.com".equalsIgnoreCase(email) && "admin123".equals(password)) {
            u = new Usuario(1, "Administrador DADO", "admin@boxesya.com", "admin123", "3001234567", "Bogota", "admin");
        }

        if (u != null) {
            HttpSession session = request.getSession();
            session.setAttribute("usuarioLogueado", u);
            if ("admin".equalsIgnoreCase(u.getRol())) {
                response.sendRedirect(request.getContextPath() + "/admin/productos");
            } else {
                response.sendRedirect(request.getContextPath() + "/productos");
            }
        } else {
            request.setAttribute("error", "Correo electrónico o contraseña incorrectos.");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
}
