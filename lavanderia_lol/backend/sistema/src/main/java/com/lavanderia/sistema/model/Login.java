package com.lavanderia.sistema.model;

public class Login {

  private String login;
  private String senha;

  public Login() {}
  public Login (String login, String senha) {

    this.login = login;
    this.senha = senha;
  }

  public String getLogin() {
    return this.login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getSenha() {
    return this.senha;
  }

}
