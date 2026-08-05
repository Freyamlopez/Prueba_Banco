package prueba.sistemaFacturacion.service;

import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.Cliente;
import prueba.sistemaFacturacion.persistence.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente saveClient (Cliente cliente){
        return this.clienteRepository.save(cliente);
    }

    
}
