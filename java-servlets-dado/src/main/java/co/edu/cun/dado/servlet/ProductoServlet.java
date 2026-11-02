package co.edu.cun.dado.servlet;

import co.edu.cun.dado.dao.ProductoDAO;
import co.edu.cun.dado.model.Producto;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

/**
 * Servlet ProductoServlet: Demuestra implementacion de metodos doGet y doPost.
 * - doGet: Listar catalogo, filtrar por categoria, ver detalle o preparar edicion.
 * - doPost: Procesar formulario de creacion y actualizacion de productos.
 */
@WebServlet(name = "ProductoServlet", urlPatterns = {"/productos", "/admin/productos", "/admin/guardar-producto"})
public class ProductoServlet extends HttpServlet {

    private ProductoDAO productoDAO;

    @Override
    public void init() throws ServletException {
        productoDAO = new ProductoDAO();
    }

    /**
     * Metodo GET: Recupera informacion y despacha a vistas JSP.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String path = request.getServletPath();
        String accion = request.getParameter("accion");

        if ("/admin/productos".equals(path)) {
            // Modulo administrativo
            if ("cambiar-estado".equals(accion)) {
                int id = Integer.parseInt(request.getParameter("id"));
                boolean nuevoEstado = Boolean.parseBoolean(request.getParameter("estado"));
                productoDAO.cambiarEstado(id, nuevoEstado);
                response.sendRedirect(request.getContextPath() + "/admin/productos");
                return;
            }

            List<Producto> listaAdmin = productoDAO.listarTodosParaAdmin();
            request.setAttribute("productos", listaAdmin);
            request.getRequestDispatcher("/admin-productos.jsp").forward(request, response);
            return;
        }

        // Modulo publico de tienda
        if ("detalle".equals(accion)) {
            int id = Integer.parseInt(request.getParameter("id"));
            Producto p = productoDAO.obtenerPorId(id);
            request.setAttribute("producto", p);
            request.getRequestDispatcher("/detalle.jsp").forward(request, response);
            return;
        }

        String categoriaParam = request.getParameter("categoria");
        List<Producto> productos;
        if (categoriaParam != null && !categoriaParam.isEmpty() && !categoriaParam.equals("0")) {
            int idCat = Integer.parseInt(categoriaParam);
            productos = productoDAO.listarPorCategoria(idCat);
            request.setAttribute("categoriaSeleccionada", idCat);
        } else {
            productos = productoDAO.listarActivos();
            request.setAttribute("categoriaSeleccionada", 0);
        }

        request.setAttribute("productos", productos);
        request.getRequestDispatcher("/productos.jsp").forward(request, response);
    }

    /**
     * Metodo POST: Recibe datos de formularios HTML y ejecuta insercion o actualizacion.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String idStr = request.getParameter("id_producto");
        String nombre = request.getParameter("nombre");
        String descripcion = request.getParameter("descripcion");
        double precio = Double.parseDouble(request.getParameter("precio"));
        int stock = Integer.parseInt(request.getParameter("stock"));
        String imagen = request.getParameter("imagen");
        int idCategoria = Integer.parseInt(request.getParameter("id_categoria"));

        Producto p = new Producto();
        p.setNombre(nombre);
        p.setDescripcion(descripcion);
        p.setPrecio(precio);
        p.setStock(stock);
        p.setImagen(imagen);
        p.setIdCategoria(idCategoria);

        if (idStr == null || idStr.trim().isEmpty() || idStr.equals("0")) {
            // Insercion de nuevo producto
            productoDAO.insertar(p);
            request.getSession().setAttribute("mensaje", "Producto '" + nombre + "' creado con éxito.");
        } else {
            // Actualizacion de producto existente
            p.setIdProducto(Integer.parseInt(idStr));
            productoDAO.actualizar(p);
            request.getSession().setAttribute("mensaje", "Producto '" + nombre + "' actualizado con éxito.");
        }

        response.sendRedirect(request.getContextPath() + "/admin/productos");
    }
}
