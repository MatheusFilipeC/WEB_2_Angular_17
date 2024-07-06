package com.lavanderia.sistema.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="tb_clientes")
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente {

  @Id
  @Column(name = "id_cliente")
  @Setter @Getter
  private int id;

  @Column(name = "nome_cliente")
  @Setter @Getter
  private String nome;

  @Column(name = "email_cliente")
  @Setter @Getter
  private String email;

  @Column(name = "cpf")
  @Setter @Getter
  private String cpf;

  @Column(name = "telefone")
  @Setter @Getter
  private String telefone;

  @Column(name = "endereco")
  @Setter @Getter
  private String endereco;

  @Column(name = "numero")
  @Setter @Getter
  private int numero;

  @Column(name = "complemento")
  @Setter @Getter
  private String complemento;

  @Column(name = "bairro")
  @Setter @Getter
  private String bairro;

  @Column(name = "cep")
  @Setter @Getter
  private String cep;

  @Column(name = "cidade")
  @Setter @Getter
  private String cidade;

  @Column(name = "uf")
  @Setter @Getter
  private String uf;

  @Column(name = "senha_cliente")
  @Setter @Getter
  private String senha;
  
}
