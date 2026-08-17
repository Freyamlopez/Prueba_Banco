package prueba.sistemaFacturacion.web.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import prueba.sistemaFacturacion.persistence.entity.Cliente;
import prueba.sistemaFacturacion.service.ClienteService;
import prueba.sistemaFacturacion.service.DTO.request.ClienteRequest;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<Page<Cliente>> getAllClients(Pageable pageable) {
        return ResponseEntity.ok(clienteService.getAllClients(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClientById(@PathVariable String id) {
        Cliente cliente = clienteService.getAllClientByIdentificacion(id);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Cliente> saveClient(@Valid @RequestBody ClienteRequest cliente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.saveClient(cliente));
    }
}