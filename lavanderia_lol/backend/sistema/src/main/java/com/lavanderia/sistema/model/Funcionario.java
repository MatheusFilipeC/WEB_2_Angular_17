package com.lavanderia.sistema.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

public class Funcionario extends Usuario {

  public Funcionario(int id, String nome, String email) {
    super(id, nome, email, null, null); 
  }

  @Setter @Getter
  private LocalDate dataNascimento;

  @Setter @Getter
  private boolean habilitada;
  
}
