package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.Cliente;

@Component
public class ClienteMapper {

    public Cliente toEntity(Cliente cliente) {
        if (cliente == null) {
            return null;
        }

        Cliente entity = new Cliente();
        entity.setId(cliente.getId());
        entity.setUsuario(cliente.getUsuario());
        entity.setIdentificacion(cliente.getIdentificacion());
        entity.setTelefono(cliente.getTelefono());
        entity.setDireccion(cliente.getDireccion());

        return entity;
    }

    public Cliente toDto(Cliente entity) {
        if (entity == null) {
            return null;
        }

        Cliente dto = new Cliente();
        dto.setId(entity.getId());
        dto.setUsuario(entity.getUsuario());
        dto.setIdentificacion(entity.getIdentificacion());
        dto.setTelefono(entity.getTelefono());
        dto.setDireccion(entity.getDireccion());

        return dto;
    }

}