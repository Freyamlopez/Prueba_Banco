package prueba.sistemaFacturacion.web.excepcion;

public class StockInsuficienteException extends RuntimeException {
    public StockInsuficienteException(String message) {
        super(message);
    }
}
