package prueba.sistemaFacturacion.web.controller;

import jakarta.validation.Valid;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import prueba.sistemaFacturacion.persistence.entity.Cliente;
import prueba.sistemaFacturacion.service.ClienteService;
import prueba.sistemaFacturacion.service.DTO.request.ClienteRequest;
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
    public ResponseEntity<List<ClienteResponse>> getAll() {
        return ResponseEntity.ok(clienteService.getAll());
    }

    @GetMapping("/{identificacion}")
    public ResponseEntity<ClienteResponse> getClientByIdentificacion(@PathVariable String identificacion) {
        return ResponseEntity.ok(clienteService.getByIdentificacion(identificacion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClientById(@PathVariable String id) {
        Cliente cliente = clienteService.getAllClientByIdentificacion(id);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Cliente> saveClient(@Valid @RequestBody ClienteRequest clienteRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.saveClient(clienteRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> updateClient(@PathVariable Long id, @Valid @RequestBody ClienteRequest clienteRequest) {
        return ResponseEntity.ok(clienteService.updateClient(id, clienteRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clienteService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}