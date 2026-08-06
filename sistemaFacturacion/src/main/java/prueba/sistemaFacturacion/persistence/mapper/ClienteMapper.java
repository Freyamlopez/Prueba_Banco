package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.Cliente;
import prueba.sistemaFacturacion.service.DTO.response.ClienteResponse;
;

@Component
public class ClienteMapper {

    public ClienteResponse toResponse(Cliente entity) {
        if (entity == null) {
            return null;
        }
        return ClienteResponse.builder()
                .nombre(String.valueOf(entity.getUsuario()))
                .identificacion(entity.getIdentificacion())
                .telefono(entity.getTelefono())
                .direccion(entity.getDireccion())
                .build();
    }
}
