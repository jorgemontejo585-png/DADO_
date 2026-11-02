package co.edu.cun.dado.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase Conexion: Gestiona la conexion a la base de datos MySQL (BoxesYa.sql).
 */
public class Conexion {
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String URL = "jdbc:mysql://localhost:3306/boxesya_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
    private static final String USER = "root";
    private static final String PASSWORD = ""; // Ajustar si MySQL tiene password local

    public static Connection getConexion() {
        Connection con = null;
        try {
            Class.forName(DRIVER);
            con = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver MySQL no encontrado -> " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Error al conectar a la base de datos -> " + e.getMessage());
        }
        return con;
    }
}
