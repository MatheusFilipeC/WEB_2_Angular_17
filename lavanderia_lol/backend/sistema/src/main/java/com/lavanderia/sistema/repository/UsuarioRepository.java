package com.lavanderia.sistema.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.sistema.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

  public Optional<Usuario> findById(int id);
  public Optional<Usuario> findByEmail(String email);
  public Optional<Usuario> findByEmailAndSenha(String email, String senha);
  
}
