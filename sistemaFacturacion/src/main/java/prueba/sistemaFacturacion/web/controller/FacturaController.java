package prueba.sistemaFacturacion.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import prueba.sistemaFacturacion.service.DTO.request.FacturaRequestDTO;
import prueba.sistemaFacturacion.service.DTO.response.FacturaResponseDTO;
import prueba.sistemaFacturacion.service.FacturaService;

@RestController
@RequestMapping("/facturas")
@RequiredArgsConstructor
public class FacturaController {

    private final FacturaService facturaService;

    @PostMapping
    @PreAuthorize("hasRole('CAJERO')")
    public ResponseEntity<FacturaResponseDTO> crearFactura(
            @Valid @RequestBody FacturaRequestDTO request,
            Authentication authentication) {

        // El cajero se identifica automáticamente por el token JWT (spec, endpoint POST /facturas)
        String emailCajero = authentication.getName();

        FacturaResponseDTO response = facturaService.crearFactura(request, emailCajero);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/cliente/{idCliente}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CAJERO', 'CLIENTE')")
    // cuando implementemos JWT/UserDetailsService, agregar validación de que
    // si el rol es CLIENTE, idCliente debe corresponder al usuario autenticado.
    // Ejemplo futuro: "hasAnyRole('ADMIN','CAJERO') or (hasRole('CLIENTE') and #idCliente == authentication.principal.clienteId)"
    public ResponseEntity<Page<FacturaResponseDTO>> obtenerPorCliente(
            @PathVariable Long idCliente,
            Pageable pageable) {

        Page<FacturaResponseDTO> response = facturaService.obtenerPorCliente(idCliente, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cajero/{idCajero}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CAJERO')")
    // si el rol es CAJERO, validar que idCajero == id del cajero autenticado.
    public ResponseEntity<Page<FacturaResponseDTO>> obtenerPorCajero(
            @PathVariable Long idCajero,
            Pageable pageable) {

        Page<FacturaResponseDTO> response = facturaService.obtenerPorCajero(idCajero, pageable);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/anular")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FacturaResponseDTO> anularFactura(@PathVariable Long id) {
        FacturaResponseDTO response = facturaService.anularFactura(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/pagar")
    @PreAuthorize("hasRole('CAJERO')")
    public ResponseEntity<FacturaResponseDTO> registrarPago(@PathVariable Long id) {
        FacturaResponseDTO response = facturaService.registrarPago(id);
        return ResponseEntity.ok(response);
    }
}

