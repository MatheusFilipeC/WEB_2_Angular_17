package com.lavanderia.sistema.model;

public class RoupasPedido {

  private int idPedido;
  private int idRoupa;
  private String pecaRoupa;
  private Double valorPeca;
  private int quantidade;
  private int prazo;

  public RoupasPedido(int idPedido, int idRoupa, String pecaRoupa, Double valorPeca, int quantidade, int prazo) {
    this.idPedido = idPedido;
    this.idRoupa = idRoupa;
    this.pecaRoupa = pecaRoupa;
    this.valorPeca = valorPeca;
    this.quantidade = quantidade;
    this.prazo = prazo;
  }

  public int getPedidoId() {
    return idPedido;
  }

  public void setPedidoId(int idPedido) {
    this.idPedido = idPedido;
  }

  public int getRoupaId() {
    return idRoupa;
  }

  public void setRoupaId(int idRoupa) {
    this.idRoupa = idRoupa;
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

  public int getQuantidade() {
    return quantidade;
  }

  public void setQuantidade (int quantidade) {
    this.quantidade = quantidade;
  }

  public int getPrazo() {
    return prazo;
  }

  public void setPrazo(int prazo) {
    this.prazo = prazo;
  }

}

