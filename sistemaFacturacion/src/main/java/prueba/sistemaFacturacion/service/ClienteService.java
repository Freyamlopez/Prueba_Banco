package prueba.sistemaFacturacion.service;

import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.Cliente;
import prueba.sistemaFacturacion.persistence.mapper.ClienteMapper;
import prueba.sistemaFacturacion.persistence.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    public ClienteService(ClienteRepository clienteRepository, ClienteMapper clienteMapper) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
    }

    public Cliente saveClient (Cliente cliente){
        return this.clienteRepository.save(cliente);
    }

    public Cliente getAllClientByIdentificacion(String identificacion){
        return this.clienteRepository.findByIdentificacion(identificacion).orElse(null);
    }
    
}
