package com.lavanderia.sistema.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.lavanderia.sistema.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findAllByOrderById();

    @Query("SELECT c.id AS id_cliente, c.nome AS nome_cliente, " +
           "COUNT(p.id) AS quantidade_pedidos, SUM(p.valor) AS valor_total_gasto " +
           "FROM Pedido p " +
           "JOIN p.cliente c " +
           "WHERE p.statusPedido NOT IN ('Rejeitado', 'Cancelado') " +
           "GROUP BY c.id, c.nome " +
           "ORDER BY COUNT(p.id) DESC")
    List<Object[]> findTopClientsByOrders();

}
