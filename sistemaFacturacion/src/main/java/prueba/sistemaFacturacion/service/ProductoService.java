package prueba.sistemaFacturacion.service;

import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.Producto;
import prueba.sistemaFacturacion.persistence.mapper.ProductoMapper;
import prueba.sistemaFacturacion.persistence.repository.ProductoRepository;
import prueba.sistemaFacturacion.service.DTO.request.ProductoRequest;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoMapper productoMapper;


    public ProductoService(ProductoRepository productoRepository, ProductoMapper productoMapper) {
        this.productoRepository = productoRepository;
        this.productoMapper = productoMapper;
    }


    public List<Producto> getAlll() {
        return this.productoRepository.findAll();
    }



    public Producto saveProduct(ProductoRequest dto) {
        Producto producto = productoMapper.toProducto(dto);
        return productoRepository.save(producto);
    }

}
