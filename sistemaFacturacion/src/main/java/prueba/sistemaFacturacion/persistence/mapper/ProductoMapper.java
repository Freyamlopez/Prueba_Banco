package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.Producto;

@Component
public class ProductoMapper {

    public Producto toEntity(Producto producto) {
        if (producto == null) {
            return null;
        }

        Producto entity = new Producto();
        entity.setId(producto.getId());
        entity.setNombre(producto.getNombre());
        entity.setPrecioUnitario(producto.getPrecioUnitario());
        entity.setStock(producto.getStock());

        return entity;
    }

    public Producto toDto(Producto entity) {
        if (entity == null) {
            return null;
        }

        Producto dto = new Producto();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setPrecioUnitario(entity.getPrecioUnitario());
        dto.setStock(entity.getStock());

        return dto;
    }
}