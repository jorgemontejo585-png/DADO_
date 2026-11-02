package co.edu.cun.dado.dao;

import co.edu.cun.dado.config.Conexion;
import co.edu.cun.dado.model.Producto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAO {

    public List<Producto> listarActivos() {
        List<Producto> lista = new ArrayList<>();
        String sql = "SELECT p.*, c.nombre AS categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria WHERE p.activo = 1 ORDER BY p.id_producto DESC";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Producto p = new Producto();
                p.setIdProducto(rs.getInt("id_producto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setPrecio(rs.getDouble("precio"));
                p.setStock(rs.getInt("stock"));
                p.setImagen(rs.getString("imagen"));
                p.setIdCategoria(rs.getInt("id_categoria"));
                p.setNombreCategoria(rs.getString("categoria"));
                p.setActivo(rs.getBoolean("activo"));
                lista.add(p);
            }
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.listarActivos: " + e.getMessage());
        }
        return lista;
    }

    public List<Producto> listarPorCategoria(int idCategoria) {
        List<Producto> lista = new ArrayList<>();
        String sql = "SELECT p.*, c.nombre AS categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria WHERE p.activo = 1 AND p.id_categoria = ? ORDER BY p.id_producto DESC";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idCategoria);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Producto p = new Producto();
                    p.setIdProducto(rs.getInt("id_producto"));
                    p.setNombre(rs.getString("nombre"));
                    p.setDescripcion(rs.getString("descripcion"));
                    p.setPrecio(rs.getDouble("precio"));
                    p.setStock(rs.getInt("stock"));
                    p.setImagen(rs.getString("imagen"));
                    p.setIdCategoria(rs.getInt("id_categoria"));
                    p.setNombreCategoria(rs.getString("categoria"));
                    p.setActivo(rs.getBoolean("activo"));
                    lista.add(p);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.listarPorCategoria: " + e.getMessage());
        }
        return lista;
    }

    public Producto obtenerPorId(int id) {
        String sql = "SELECT p.*, c.nombre AS categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria WHERE p.id_producto = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Producto p = new Producto();
                    p.setIdProducto(rs.getInt("id_producto"));
                    p.setNombre(rs.getString("nombre"));
                    p.setDescripcion(rs.getString("descripcion"));
                    p.setPrecio(rs.getDouble("precio"));
                    p.setStock(rs.getInt("stock"));
                    p.setImagen(rs.getString("imagen"));
                    p.setIdCategoria(rs.getInt("id_categoria"));
                    p.setNombreCategoria(rs.getString("categoria"));
                    p.setActivo(rs.getBoolean("activo"));
                    return p;
                }
            }
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.obtenerPorId: " + e.getMessage());
        }
        return null;
    }

    public boolean insertar(Producto p) {
        String sql = "INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria, activo) VALUES (?, ?, ?, ?, ?, ?, 1)";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, p.getNombre());
            ps.setString(2, p.getDescripcion());
            ps.setDouble(3, p.getPrecio());
            ps.setInt(4, p.getStock());
            ps.setString(5, p.getImagen());
            ps.setInt(6, p.getIdCategoria());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.insertar: " + e.getMessage());
            return false;
        }
    }

    public boolean actualizar(Producto p) {
        String sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, id_categoria = ? WHERE id_producto = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, p.getNombre());
            ps.setString(2, p.getDescripcion());
            ps.setDouble(3, p.getPrecio());
            ps.setInt(4, p.getStock());
            ps.setString(5, p.getImagen());
            ps.setInt(6, p.getIdCategoria());
            ps.setInt(7, p.getIdProducto());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.actualizar: " + e.getMessage());
            return false;
        }
    }

    public boolean cambiarEstado(int id, boolean nuevoEstado) {
        String sql = "UPDATE productos SET activo = ? WHERE id_producto = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, nuevoEstado ? 1 : 0);
            ps.setInt(2, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.cambiarEstado: " + e.getMessage());
            return false;
        }
    }

    public List<Producto> listarTodosParaAdmin() {
        List<Producto> lista = new ArrayList<>();
        String sql = "SELECT p.*, c.nombre AS categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria ORDER BY p.id_producto DESC";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Producto p = new Producto();
                p.setIdProducto(rs.getInt("id_producto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setPrecio(rs.getDouble("precio"));
                p.setStock(rs.getInt("stock"));
                p.setImagen(rs.getString("imagen"));
                p.setIdCategoria(rs.getInt("id_categoria"));
                p.setNombreCategoria(rs.getString("categoria"));
                p.setActivo(rs.getBoolean("activo"));
                lista.add(p);
            }
        } catch (SQLException e) {
            System.err.println("Error en ProductoDAO.listarTodosParaAdmin: " + e.getMessage());
        }
        return lista;
    }
}
