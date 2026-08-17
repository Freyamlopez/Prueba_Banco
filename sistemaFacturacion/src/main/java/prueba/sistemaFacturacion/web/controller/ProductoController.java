package prueba.sistemaFacturacion.web.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import prueba.sistemaFacturacion.persistence.entity.Producto;
import prueba.sistemaFacturacion.service.DTO.request.ProductoRequest;
import prueba.sistemaFacturacion.service.ProductoService;
import prueba.sistemaFacturacion.web.excepcion.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping ("/productos")
public class ProductoController {

    private final ProductoService productoService;


    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }


    @GetMapping
    public ResponseEntity<List<Producto>> getAll () {
        return ResponseEntity.ok(this.productoService.getAlll());
    }


    @PostMapping
    public ResponseEntity<Producto> saveProduct (@Valid @RequestBody ProductoRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.saveProduct(dto));
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Producto> updateProduct (@PathVariable Long id, @Valid @RequestBody ProductoRequest dto) {
        return ResponseEntity.ok(productoService.updateProduct(id, dto));
    }


    @PutMapping ("/{id}/estado")
    public ResponseEntity<Producto> changeStatus (@PathVariable Long id, @RequestParam Boolean activo) {
        return ResponseEntity.ok(productoService.changeStatus(id, activo));
    }

}
