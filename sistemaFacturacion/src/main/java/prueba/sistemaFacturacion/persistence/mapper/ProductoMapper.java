package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.Producto;
import prueba.sistemaFacturacion.service.DTO.request.ProductoRequest;

@Component
public class ProductoMapper {
    Producto producto = new Producto();

    public Producto toProducto(ProductoRequest productoRequest) {
        if (productoRequest == null) {
            return null;
        }

            Producto producto = new Producto();
            producto.setNombre(productoRequest.getNombre());
            producto.setDescripcion(productoRequest.getDescripcion());
            producto.setPrecioUnitario(productoRequest.getPrecioUnitario());
            producto.setStock(productoRequest.getStock());
            producto.setActivo(productoRequest.getActivo());

            return producto;
        }

    public void updateProducto(
            Producto producto,
            ProductoRequest productoRequest) {

        producto.setNombre(productoRequest.getNombre());
        producto.setDescripcion(productoRequest.getDescripcion());
        producto.setPrecioUnitario(productoRequest.getPrecioUnitario());
        producto.setStock(productoRequest.getStock());
        producto.setActivo(productoRequest.getActivo());
    }
}
