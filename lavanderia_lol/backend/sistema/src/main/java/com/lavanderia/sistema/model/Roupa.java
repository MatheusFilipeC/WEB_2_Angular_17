package com.lavanderia.sistema.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

public class Roupa {

  @Getter @Setter
  private int id;

  @Getter @Setter
  private String pecaRoupa;

  @Getter @Setter
  private Double preco;

  @Getter @Setter
  private int prazo;

  @Getter @Setter
  private boolean habilitada;
  
}
