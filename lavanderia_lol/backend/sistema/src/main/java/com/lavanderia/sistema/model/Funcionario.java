package com.lavanderia.sistema.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

public class Funcionario extends Usuario {

  public Funcionario(int id, String nome, String email, String senha, String perfil, LocalDate dataNascimento, boolean habilitada) {
    super(id, nome, email, senha, perfil); 
    this.dataNascimento = dataNascimento;
    this.habilitada = habilitada;
  }

  @Setter @Getter
  private LocalDate dataNascimento;

  @Setter @Getter
  private boolean habilitada;
  
}
