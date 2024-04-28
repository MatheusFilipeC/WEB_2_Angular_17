package com.lavanderia.sistema.model;

public class Usuario {

  private int id;
  private String nome;
  private String email;
  private String senha;
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