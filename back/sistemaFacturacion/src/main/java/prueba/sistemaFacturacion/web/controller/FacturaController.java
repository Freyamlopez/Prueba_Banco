package prueba.sistemaFacturacion.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(summary = "Crear Factura")
    @PreAuthorize("hasRole('CAJERO')")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    public ResponseEntity<FacturaResponseDTO> crearFactura(
            @Valid @RequestBody FacturaRequestDTO request,
            Authentication authentication) {

        // El cajero se identifica automáticamente por el token JWT (spec, endpoint POST /facturas)
        String emailCajero = authentication.getName();

        FacturaResponseDTO response = facturaService.crearFactura(request, emailCajero);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Obtener facturas por cliente")
    @GetMapping("/cliente/{idCliente}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CAJERO', 'CLIENTE')")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    @ApiResponse(responseCode = "404", description = "No se encontraron registros del usuario")
    // cuando implementemos JWT/UserDetailsService, agregar validación de que
    // si el rol es CLIENTE, idCliente debe corresponder al usuario autenticado.
    // Ejemplo futuro: "hasAnyRole('ADMIN','CAJERO') or (hasRole('CLIENTE') and #idCliente == authentication.principal.clienteId)"
    public ResponseEntity<Page<FacturaResponseDTO>> obtenerPorCliente(
            @PathVariable Long idCliente,
            Pageable pageable) {

        Page<FacturaResponseDTO> response = facturaService.obtenerPorCliente(idCliente, pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener facturas por Cajero")
    @GetMapping("/cajero/{idCajero}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CAJERO')")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    @ApiResponse(responseCode = "404", description = "No se encontraron registros del usuario")
    // si el rol es CAJERO, validar que idCajero == id del cajero autenticado.
    public ResponseEntity<Page<FacturaResponseDTO>> obtenerPorCajero(
            @PathVariable Long idCajero,
            Pageable pageable) {

        Page<FacturaResponseDTO> response = facturaService.obtenerPorCajero(idCajero, pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Anolar facturas por id")
    @PutMapping("/{id}/anular")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    @ApiResponse(responseCode = "404", description = "No se encontraron registros")
    public ResponseEntity<FacturaResponseDTO> anularFactura(@PathVariable Long id) {
        FacturaResponseDTO response = facturaService.anularFactura(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Registrar pago")
    @PutMapping("/{id}/pagar")
    @PreAuthorize("hasRole('CAJERO')")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    public ResponseEntity<FacturaResponseDTO> registrarPago(@PathVariable Long id) {
        FacturaResponseDTO response = facturaService.registrarPago(id);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/mis-facturas")
    @PreAuthorize("hasRole('CLIENTE')")
    @Operation(summary = "Obtener mis facturas")
    @ApiResponse(responseCode = "200", description = "Facturas del cliente autenticado")
    @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    public ResponseEntity<Page<FacturaResponseDTO>> obtenerMisFacturas(
            Authentication authentication,
            Pageable pageable) {

        String correo = authentication.getName();

        Page<FacturaResponseDTO> response =
                facturaService.obtenerMisFacturas(correo, pageable);

        return ResponseEntity.ok(response);
    }
}

