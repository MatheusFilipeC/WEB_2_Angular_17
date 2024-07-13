package com.lavanderia.sistema.rest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.sistema.model.Pedido;
import com.lavanderia.sistema.model.RoupasPedido;
import com.lavanderia.sistema.repository.PedidoRepository;
import com.lavanderia.sistema.repository.RoupasPedidoRepository;

@CrossOrigin
@RestController

public class PedidoREST {

  @Autowired
  private PedidoRepository pedidoRepository;

  @Autowired
  private RoupasPedidoRepository roupasPedidoRepository;

  public static List<Pedido> pedidos = new ArrayList<>();

  public int determinarPrazo(Pedido pedido) {
    int maiorPrazo = 0;
    for (RoupasPedido roupa : pedido.getRoupas()) {
      if (roupa.getPrazo() > maiorPrazo) {
        maiorPrazo = roupa.getPrazo();
      }
    }
    return maiorPrazo;
  }

  public static double somarValoresRoupasDePedido(Pedido pedido) {
    double totalValorRoupas = 0.0;
    for (RoupasPedido roupa : pedido.getRoupas()) {
      totalValorRoupas += roupa.getValorPeca() * roupa.getQuantidade();
    }
    return totalValorRoupas;
}

  @GetMapping("/pedidos")
  public ResponseEntity<List<Pedido>> obterTodosPedidos() {
    List<Pedido> pedidos = pedidoRepository.findAllByOrderById();
    return ResponseEntity.ok(pedidos);
  }

  @GetMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> obterPedidoPorId(@PathVariable("id") int id) {
    Optional<Pedido> op = pedidoRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/pedidos")
  public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {

    if ("Rejeitado".equals(pedido.getStatusPedido())) {
      pedido.setDataPedido(LocalDateTime.now());
      int prazo = determinarPrazo(pedido);
      pedido.setPrazo(prazo);
      double total = somarValoresRoupasDePedido(pedido);
      pedido.setValor(total);
    } else {
      int prazo = determinarPrazo(pedido);
      pedido.setPrazo(prazo);
      pedido.setDataPedido(LocalDateTime.now());

      LocalDateTime dataColeta = pedido.getDataPedido().plusHours(4);
      pedido.setDataColeta(dataColeta);

      LocalDateTime dataEntrega = dataColeta.plusDays(prazo);
      pedido.setDataEntrega(dataEntrega);
      pedido.setDataEstimativa(dataEntrega);

      double total = somarValoresRoupasDePedido(pedido);
      pedido.setValor(total);
      pedido.setStatusPedido("Em Aberto");
    }

    pedidoRepository.save(pedido);

    if (pedido.getRoupas() != null) {
      for (RoupasPedido roupasPedido : pedido.getRoupas()) {
        roupasPedido.setIdPedido(pedido.getId());
        roupasPedidoRepository.save(roupasPedido);
      }
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
  }

  @PutMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> alterarPedido(@PathVariable("id") int id, @RequestBody Pedido pedido) {
    Optional<Pedido> op = pedidoRepository.findById(Integer.valueOf(id));

    if (op.isPresent()) {
      pedido.setStatusPedido(pedido.getStatusPedido());
      pedido.setDataPagamento(pedido.getDataPagamento());
      pedidoRepository.save(pedido);
      return ResponseEntity.ok(pedido);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

}
