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

import com.lavanderia.sistema.model.Cliente;
import com.lavanderia.sistema.model.Pedido;
import com.lavanderia.sistema.model.RoupasPedido;

@CrossOrigin
@RestController

public class PedidoREST {

  public static List<Pedido> pedidos = new ArrayList<>();

  public int encontrarMaiorPrazo(Pedido pedido) {
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

      int maiorPrazo = encontrarMaiorPrazo(pedido);
      double total = somarValoresRoupasDePedido(pedido);
      LocalDateTime dataPedido = LocalDateTime.now();
      LocalDateTime dataColeta = dataPedido.plusHours(4);
      LocalDateTime dataEntrega = dataColeta.plusDays(maiorPrazo);

      pedido.setDataPedido(dataPedido);
      pedido.setDataColeta(dataColeta);
      pedido.setDataEntrega(dataEntrega);
      pedido.setValor(total);
      pedido.setStatusPedido("Em Aberto");
      pedidos.add(pedido);
      return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
  }

  @PutMapping("/pedidos/{id}")
  public ResponseEntity<Pedido> alterarPedido(@PathVariable("id") int id, @RequestBody Pedido pedido) {

   Pedido p = pedidos.stream().filter(
        ped -> ped.getId() == id).findAny().orElse(null);

    if (p != null) {
      p.setStatusPedido(pedido.getStatusPedido());

      return ResponseEntity.ok(p);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

    static {

      Cliente cliente1 = new Cliente(3, "João", "joao@mail.com", "1234");
      Cliente cliente2 = new Cliente(4, "José", "jose@mail.com", "1234");
    
      List<RoupasPedido> roupasPedido1 = new ArrayList<>();
      roupasPedido1.add(new RoupasPedido(1, 1, "Camisa", 15.00, 1, 4));
      roupasPedido1.add(new RoupasPedido(1, 2, "Calça", 25.00, 1, 3));
    
      List<RoupasPedido> roupasPedido2 = new ArrayList<>();
      roupasPedido2.add(new RoupasPedido(2, 3, "Meia", 5.00, 1, 1));
      roupasPedido2.add(new RoupasPedido(2, 4, "Camiseta", 20.00, 1, 2));

      pedidos.add(new Pedido(1, 40.00, "Em andamento", cliente1, roupasPedido1));
      pedidos.add(new Pedido(2, 25.00, "Concluído", cliente2, roupasPedido2));
      pedidos.add(new Pedido(3, 25.00, "Concluído", cliente2, roupasPedido2));

    }
  
}
