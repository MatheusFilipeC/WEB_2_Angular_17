package com.lavanderia.sistema.model;

public class RoupasPedido {

  private int pedidoId;
  private int roupaId;
  private String pecaRoupa;
  private Double valorPeca;
  private int prazo;

  public RoupasPedido(int pedidoId, int roupaId, String pecaRoupa, Double valorPeca, int prazo) {
    this.pedidoId = pedidoId;
    this.roupaId = roupaId;
    this.pecaRoupa = pecaRoupa;
    this.valorPeca = valorPeca;
    this.prazo = prazo;
  }

  public int getPedidoId() {
    return pedidoId;
  }

  public void setPedidoId(int pedidoId) {
    this.pedidoId = pedidoId;
  }

  public int getRoupaId() {
    return roupaId;
  }

  public void setRoupaId(int roupaId) {
    this.roupaId = roupaId;
  }

  public String getPecaRoupa() {
    return pecaRoupa;
  }

  public void setPecaRoupa(String pecaRoupa) {
    this.pecaRoupa = pecaRoupa;
  }

  public Double getValorPeca () {
    return valorPeca;
  }

  public void setValorPeca(Double valorPeca) {
    this.valorPeca = valorPeca;
  }

  public int getPrazo() {
    return prazo;
  }

  public void setPrazo(int prazo) {
    this.prazo = prazo;
  }

}

