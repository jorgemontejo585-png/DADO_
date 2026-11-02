package co.edu.cun.dado.servlet;

import co.edu.cun.dado.dao.ProductoDAO;
import co.edu.cun.dado.model.ItemCarrito;
import co.edu.cun.dado.model.Producto;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Servlet CarritoServlet:
 * - doGet: Muestra el contenido del carrito o elimina un elemento.
 * - doPost: Agrega productos con su respectiva cantidad solicitada.
 */
@WebServlet(name = "CarritoServlet", urlPatterns = {"/carrito"})
public class CarritoServlet extends HttpServlet {

    private ProductoDAO productoDAO;

    @Override
    public void init() throws ServletException {
        productoDAO = new ProductoDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession();
        List<ItemCarrito> carrito = (List<ItemCarrito>) session.getAttribute("carrito");
        if (carrito == null) {
            carrito = new ArrayList<>();
            session.setAttribute("carrito", carrito);
        }

        String accion = request.getParameter("accion");
        if ("eliminar".equals(accion)) {
            int idProducto = Integer.parseInt(request.getParameter("id"));
            carrito.removeIf(item -> item.getProducto().getIdProducto() == idProducto);
            response.sendRedirect(request.getContextPath() + "/carrito");
            return;
        }

        double total = 0.0;
        for (ItemCarrito item : carrito) {
            total += item.getSubtotal();
        }
        request.setAttribute("totalCarrito", total);
        request.getRequestDispatcher("/carrito.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int idProducto = Integer.parseInt(request.getParameter("id_producto"));
        int cantidad = Integer.parseInt(request.getParameter("cantidad"));

        Producto producto = productoDAO.obtenerPorId(idProducto);

        if (producto != null) {
            HttpSession session = request.getSession();
            List<ItemCarrito> carrito = (List<ItemCarrito>) session.getAttribute("carrito");
            if (carrito == null) {
                carrito = new ArrayList<>();
                session.setAttribute("carrito", carrito);
            }

            boolean encontrado = false;
            for (ItemCarrito item : carrito) {
                if (item.getProducto().getIdProducto() == idProducto) {
                    item.setCantidad(item.getCantidad() + cantidad);
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                carrito.add(new ItemCarrito(producto, cantidad));
            }
        }

        response.sendRedirect(request.getContextPath() + "/carrito");
    }
}
