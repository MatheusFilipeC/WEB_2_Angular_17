package com.lavanderia.sistema.rest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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

@CrossOrigin
@RestController

public class PedidoREST {

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
      totalValorRoupas += roupa.getValorPeca();
    }
    return totalValorRoupas;
  }

  @GetMapping("/pedidos")
  public ResponseEntity<List<Pedido>> obterTodosPedidos() {

    return ResponseEntity.ok(pedidos);
  }

  @GetMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> obterPedidoPorId(@PathVariable("id") int id) {

    Pedido p = pedidos.stream().filter(
        pedi -> pedi.getId() == id).findAny().orElse(null);

    if (p == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    else
      return ResponseEntity.ok(p);
  }

  @PostMapping("/pedidos")
  public ResponseEntity<Pedido> inserirPedido(@RequestBody Pedido pedido) {

    Pedido p = pedidos.stream().max(Comparator.comparing(Pedido::getId)).orElse(null);

    if (p == null)
      pedido.setId(1);
    else
      pedido.setId(p.getId() + 1);

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

    if (pedido.getRoupas() != null) {
      for (RoupasPedido roupasPedido : pedido.getRoupas()) {
        roupasPedido.setPedidoId(pedido.getId());
      }
    }

    pedidos.add(pedido);
    return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
  }

  @PutMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> alterarPedido(@PathVariable("id") int id, @RequestBody Pedido pedido) {

    Pedido p = pedidos.stream().filter(
        ped -> ped.getId() == id).findAny().orElse(null);

    if (p != null) {
      p.setStatusPedido(pedido.getStatusPedido());
      p.setDataPagamento(pedido.getDataPagamento());

      return ResponseEntity.ok(p);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

}
