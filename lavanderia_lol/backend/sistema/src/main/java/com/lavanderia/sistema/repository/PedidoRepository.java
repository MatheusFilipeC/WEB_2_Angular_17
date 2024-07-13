package com.lavanderia.sistema.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.lavanderia.sistema.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findAllByOrderById();

    @Query("SELECT p.cliente.id AS id_cliente, COUNT(p.id) AS quantidade_pedidos, SUM(p.valor) AS valor_total_gasto " +
           "FROM Pedido p " +
           "WHERE p.statusPedido NOT IN ('Rejeitado', 'Cancelado') " +
           "GROUP BY p.cliente.id " +
           "ORDER BY COUNT(p.id) DESC")

    List<Object> findTopClientsByOrders();

}
