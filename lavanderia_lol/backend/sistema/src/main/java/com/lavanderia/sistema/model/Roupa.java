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

@Entity
@Table(name = "tb_roupas")
@NoArgsConstructor
@AllArgsConstructor

public class Roupa {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="id_roupa")
  @Getter @Setter
  private int id;

  @Column(name="peca_roupa")
  @Getter @Setter
  private String pecaRoupa;

  @Column(name="preco")
  @Getter @Setter
  private Double preco;

  @Column(name="prazo")
  @Getter @Setter
  private int prazo;

  @Column(name="habilitada")
  @Getter @Setter
  private boolean habilitada;
  
}
