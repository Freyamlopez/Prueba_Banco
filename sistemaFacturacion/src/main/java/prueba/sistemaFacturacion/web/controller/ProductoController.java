package prueba.sistemaFacturacion.web.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import prueba.sistemaFacturacion.persistence.entity.Producto;
import prueba.sistemaFacturacion.service.DTO.request.ProductoRequest;
import prueba.sistemaFacturacion.service.ProductoService;

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

}
