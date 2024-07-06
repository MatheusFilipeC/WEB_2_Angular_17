package com.lavanderia.sistema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor


@Entity
@Table (name = "tb_roupas_pedido")
public class RoupasPedido {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column (name = "id_item")
  @Getter @Setter
  private int id;

  @Column (name = "id_pedido")
  @Getter @Setter
  private int idPedido;

  @Column (name = "id_roupa")
  @Getter @Setter
  private int idRoupa;

  @Column (name = "peca_roupa")
  @Getter @Setter
  private String pecaRoupa;

  @Column (name = "valor_peca")
  @Getter @Setter
  private Double valorPeca;

  @Column (name = "quantidade")
  @Getter @Setter
  private int quantidade;

  @Column (name = "prazo")
  @Getter @Setter
  private int prazo;

}

