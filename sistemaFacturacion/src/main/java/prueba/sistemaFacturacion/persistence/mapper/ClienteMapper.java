package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.Cliente;

import prueba.sistemaFacturacion.service.DTO.request.ClienteRequest;
import prueba.sistemaFacturacion.service.DTO.response.ClienteResponse;

@Component
public class ClienteMapper {

    Cliente cliente = new Cliente();
    public Cliente toCliente(ClienteRequest clienteRequest) {
        if (clienteRequest == null) {
            return null;
        }

        Cliente cliente = new Cliente();
        cliente.setId(cliente.getId());
        cliente.setUsuario(cliente.getUsuario());
        cliente.setIdentificacion(cliente.getIdentificacion());
        cliente.setTelefono(cliente.getTelefono());
        cliente.setDireccion(cliente.getDireccion());

        return cliente;
    }

}
