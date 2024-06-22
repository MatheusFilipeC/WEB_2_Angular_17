package com.lavanderia.sistema.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="tb_funcionarios")
@NoArgsConstructor
@AllArgsConstructor

public class Funcionario {

  @Id
  @Column(name = "id_func")
  @Setter @Getter
  private int id;

  @Column(name = "nome_func")
  @Setter @Getter
  private String nome;

  @Column(name = "email_func")
  @Setter @Getter
  private String email;

  @Column(name = "senha_func")
  @Setter @Getter
  private String senha;

  @Temporal(TemporalType.DATE)
  @Column(name="data_nascimento")
  @Setter @Getter
  private LocalDate dataNascimento;

  @Column(name="habilitada")
  @Setter @Getter
  private boolean habilitada;
  
}