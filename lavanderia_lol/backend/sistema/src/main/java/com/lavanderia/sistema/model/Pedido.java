package com.lavanderia.sistema.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

public class Pedido {

  @Getter @Setter
  private int id;

  @Getter @Setter
  private LocalDateTime dataPedido;

  @Getter @Setter
  private LocalDateTime dataEstimativa;

  @Getter @Setter
  private LocalDateTime dataColeta;

  @Getter @Setter
  private LocalDateTime dataEntrega;

  @Getter @Setter
  private LocalDateTime dataPagamento;

  @Getter @Setter
  private Double valor;

  @Getter @Setter
  private int prazo;

  @Getter @Setter
  private String statusPedido;

  @Getter @Setter
  private Cliente cliente;

  @Getter @Setter
  private List<RoupasPedido> roupas;
  
}
