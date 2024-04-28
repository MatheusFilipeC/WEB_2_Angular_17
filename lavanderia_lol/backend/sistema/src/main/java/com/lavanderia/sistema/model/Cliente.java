package com.lavanderia.sistema.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

public class Cliente extends Usuario {

  public Cliente (int id, String nome, String email) {
    super(id, nome, email, null, null);
  }

  @Setter @Getter
  private String cpf;

  @Setter @Getter
  private String logradouro;

  @Setter @Getter
  private String endereco;

  @Setter @Getter
  private int numero;

  @Setter @Getter
  private String bairro;

  @Setter @Getter
  private String cep;

  @Setter @Getter
  private String cidade;

  @Setter @Getter
  private String uf;
  
}