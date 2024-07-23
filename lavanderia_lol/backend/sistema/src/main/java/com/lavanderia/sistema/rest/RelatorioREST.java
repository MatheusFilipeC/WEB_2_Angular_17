package com.lavanderia.sistema.rest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.sistema.model.Pedido;
import com.lavanderia.sistema.repository.PedidoRepository;

@CrossOrigin
@RestController

public class RelatorioREST {

  @Autowired
  private PedidoRepository pedidoRepository;

  public static List<Pedido> relatorios = new ArrayList<>();

  @GetMapping("/relatorio/receitas")
  public ResponseEntity<List<Object[]>> obterReceitas(
          @RequestParam(value = "dataInicial", required = false)
          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataInicial,
          @RequestParam(value = "dataFinal", required = false)
          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataFinal) {
      List<Object[]> relatorios = pedidoRepository.findReceitaByPeriodo(dataInicial, dataFinal);
      return ResponseEntity.ok(relatorios);
  }

  @GetMapping("/relatorio/fieis")
  public ResponseEntity<List<Object[]>> obterClientesFieis() {
    List<Object[]> relatorios = pedidoRepository.findTopClientsByOrders();
    return ResponseEntity.ok(relatorios);
  }

}
