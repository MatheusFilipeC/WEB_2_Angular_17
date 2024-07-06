package com.lavanderia.sistema.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.sistema.model.RoupasPedido;

public interface RoupasPedidoRepository extends JpaRepository<RoupasPedido, Integer> {
  public Optional<RoupasPedido> findById(int id);
}
