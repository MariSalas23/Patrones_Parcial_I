package com.pedidos.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

import com.pedidos.backend.model.Pedido;
import com.pedidos.backend.repository.PedidoRepository;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository repository;

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Pedido buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    public Pedido crear(Pedido pedido) {
        return repository.save(pedido);
    }

    public Pedido actualizar(Long id, Pedido pedidoActualizado) {
        Pedido pedido = buscar(id);
        pedido.setCliente(pedidoActualizado.getCliente());
        pedido.setProducto(pedidoActualizado.getProducto());
        pedido.setCantidad(pedidoActualizado.getCantidad());
        return repository.save(pedido);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}