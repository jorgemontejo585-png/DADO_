package co.edu.cun.dado.dao;

import co.edu.cun.dado.config.Conexion;
import co.edu.cun.dado.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioDAO {

    public Usuario autenticar(String email, String password) {
        String sql = "SELECT * FROM usuarios WHERE email = ?";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    // En caso de que se use admin@boxesya.com o contraseña de texto / demo
                    Usuario u = new Usuario();
                    u.setIdUsuario(rs.getInt("id_usuario"));
                    u.setNombre(rs.getString("nombre"));
                    u.setEmail(rs.getString("email"));
                    u.setPassword(rs.getString("password"));
                    u.setTelefono(rs.getString("telefono"));
                    u.setDireccion(rs.getString("direccion"));
                    u.setRol(rs.getString("rol"));
                    return u;
                }
            }
        } catch (SQLException e) {
            System.err.println("Error en UsuarioDAO.autenticar: " + e.getMessage());
        }
        return null;
    }

    public boolean registrar(Usuario u) {
        String sql = "INSERT INTO usuarios (nombre, email, password, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?, 'cliente')";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, u.getNombre());
            ps.setString(2, u.getEmail());
            ps.setString(3, u.getPassword());
            ps.setString(4, u.getTelefono());
            ps.setString(5, u.getDireccion());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error en UsuarioDAO.registrar: " + e.getMessage());
            return false;
        }
    }
}
