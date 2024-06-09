package com.lavanderia.sistema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuarios")
public class Usuario {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "id_usu")
  private int id;
  @Column(name = "nome_usu")
  private String nome;
  @Column(name = "email_usu")
  private String email;
  @Column(name = "senha_usu")
  private String senha;
  @Column(name = "perfil_usu")
  private String perfil;

  public Usuario() {}

  public Usuario (int id, String nome, String email, String senha, String perfil) {

    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.perfil = perfil;

  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getNome() {
    return this.nome;
  }

  public void setNome (String nome) {
    this.nome = nome;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSenha() {
    return this.senha;
  }

  public void setSenha (String senha) {
    this.senha = senha;
  }

  public String getPerfil() {
    return this.perfil;
  }

  public void setPerfil (String perfil) {
    this.perfil = perfil;
  }
  
}
