package prueba.sistemaFacturacion.service;

import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.Cliente;
import prueba.sistemaFacturacion.persistence.mapper.ClienteMapper;
import prueba.sistemaFacturacion.persistence.repository.ClienteRepository;
import prueba.sistemaFacturacion.service.DTO.request.ClienteRequest;
import prueba.sistemaFacturacion.service.DTO.request.ClienteRequest;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;
    private final UsuarioRepository usuarioRepository;


    public ClienteService(ClienteRepository clienteRepository, ClienteMapper clienteMapper, UsuarioRepository usuarioRepository) {
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
        this.usuarioRepository = usuarioRepository;
    }

    public List<ClienteResponse> getAll() {
        return clienteRepository.findAll()
                .stream()
                .map(clienteMapper::toResponse)
                .toList();
    }

    public ClienteResponse getByIdentificacion(String identificacion) {
        Cliente cliente = clienteRepository.findByIdentificacion(identificacion)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con identificación " + identificacion));

        return clienteMapper.toResponse(cliente);
    }

    public ClienteResponse saveClient(ClienteRequest dto) {

        if (clienteRepository.existsByIdentificacion(dto.getIdentificacion())) {
            throw new RecursoDuplicadoException("Ya existe un cliente con esa identificación.");
        }

        Usuario usuario = usuarioRepository.findByCorreo(dto.getUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("No existe un usuario con correo " + dto.getUsuario()));

        Cliente cliente = clienteMapper.toCliente(dto);
        cliente.setUsuario(usuario);

        return clienteMapper.toResponse(clienteRepository.save(cliente));
    }

    public ClienteResponse updateClient(Long id, ClienteRequest dto) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id " + id));

        if (!cliente.getIdentificacion().equals(dto.getIdentificacion()) && clienteRepository.existsByIdentificacion(dto.getIdentificacion())) {
            throw new RecursoDuplicadoException("Ya existe un cliente con esa identificación.");
        }

        Usuario usuario = usuarioRepository.findByCorreo(dto.getUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("No existe un usuario con correo " + dto.getUsuario()));

        clienteMapper.actualizarDesdeRequest(cliente, dto);
        cliente.setUsuario(usuario);

        return clienteMapper.toResponse(clienteRepository.save(cliente));
    }

    public void deleteClient(Long id) {

        if (!clienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente no encontrado con id " + id);
        }

        clienteRepository.deleteById(id);
    }

    /*public Cliente saveClient (ClienteRequest dto){
        Cliente cliente = clienteMapper.toCliente(dto);
        return clienteRepository.save(cliente);
    }

    public Cliente getAllClientByIdentificacion(String identificacion){
        return this.clienteRepository.findByIdentificacion(identificacion).orElse(null);
    }*/
}
