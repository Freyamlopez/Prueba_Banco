package prueba.sistemaFacturacion.service;

import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.Producto;
import prueba.sistemaFacturacion.persistence.repository.ProductoRepository;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;


    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }


    public List<Producto> getAlll() {
        return this.productoRepository.findAll();
    }


    public Producto saveProduct (Producto producto){
        return this.productoRepository.save(producto);
    }

}
