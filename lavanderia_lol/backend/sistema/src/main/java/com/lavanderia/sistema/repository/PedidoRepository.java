package com.lavanderia.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lavanderia.sistema.model.Pedido;

import java.util.Optional;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.cliente LEFT JOIN FETCH p.roupas WHERE p.id = :id")
    Optional<Pedido> findByIdWithDetails(@Param("id") int id);
}

