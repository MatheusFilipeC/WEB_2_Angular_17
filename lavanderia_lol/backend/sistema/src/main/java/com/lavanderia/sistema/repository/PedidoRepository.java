package com.lavanderia.sistema.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.sistema.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
  public Optional<Pedido> findById (int id);
}
