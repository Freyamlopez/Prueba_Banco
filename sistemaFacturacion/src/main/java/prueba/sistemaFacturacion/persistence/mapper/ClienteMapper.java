package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.Cliente;

import prueba.sistemaFacturacion.service.DTO.request.ClienteRequest;
import prueba.sistemaFacturacion.service.DTO.response.ClienteResponse;


@Component
public class ClienteMapper {

    public Cliente toCliente(ClienteRequest clienteRequest) {

        if (clienteRequest == null) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setIdentificacion(clienteRequest.getIdentificacion());
        cliente.setTelefono(clienteRequest.getTelefono());
        cliente.setDireccion(clienteRequest.getDireccion());
        // El usuario es opcional según el documento
        return cliente;
    }

}