package com.pedidos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedidos.backend.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}