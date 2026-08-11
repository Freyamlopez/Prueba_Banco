package prueba.sistemaFacturacion.web.excepcion;

public class EstadoFacturaInvalidoException extends RuntimeException {
    public EstadoFacturaInvalidoException(String message) {
        super(message);
    }
}
