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

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClientByIdentificacion(@PathVariable String identificacion) {
        Cliente cliente = clienteService.getAllClientByIdentificacion(identificacion);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Cliente> saveClient(@Valid @RequestBody ClienteRequest clienteRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.saveClient(clienteRequest));
    }
}