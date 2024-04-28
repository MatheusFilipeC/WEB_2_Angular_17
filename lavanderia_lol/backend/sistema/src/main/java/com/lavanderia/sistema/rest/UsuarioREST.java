package com.lavanderia.sistema.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.sistema.model.Login;
import com.lavanderia.sistema.model.Usuario;

@CrossOrigin
@RestController

public class UsuarioREST {

  public static List<Usuario> usuarios = new ArrayList<>();

  @PostMapping("/login")
  public ResponseEntity<Usuario> login(@RequestBody Login login) {

    Usuario usuario = usuarios.stream().filter(
        usu -> usu.getEmail().equals(login.getLogin()) &&
            usu.getSenha().equals(login.getSenha()))
        .findAny().orElse(null);

    if (usuario == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    else
      return ResponseEntity.ok(usuario);
  }

  @GetMapping("/usuarios")
  public static List<Usuario> obterTodosUsuarios() {
    return usuarios;
  }

  @GetMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable("id") int id) {

    Usuario u = usuarios.stream().filter(usu -> usu.getId() == id).findAny().orElse(null);

    if (u == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    else
      return ResponseEntity.ok(u);
  }

  @PostMapping("/usuarios")
  public ResponseEntity<Usuario> inserirUsuario(@RequestBody Usuario usuario) {

    Usuario u = usuarios.stream().filter(
        usu -> usu.getEmail().equals(usuario.getEmail())).findAny().orElse(null);

    if (u != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    u = usuarios.stream().max(Comparator.comparing(Usuario::getId)).orElse(null);

    if (u == null)
      usuario.setId(1);
    else
      usuario.setId(u.getId() + 1);
    usuarios.add(usuario);
    return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
  }

  @PutMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> alterarUsuario(@PathVariable("id") int id, @RequestBody Usuario usuario) {

    Usuario u = usuarios.stream().filter(
        usu -> usu.getId() == id).findAny().orElse(null);

    if (u != null) {
      u.setNome(usuario.getNome());
      u.setEmail(usuario.getEmail());
      u.setSenha(usuario.getSenha());
      u.setPerfil(usuario.getPerfil());
      return ResponseEntity.ok(u);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @DeleteMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> removerUsuario(@PathVariable("id") int id) {

    Usuario usuario = usuarios.stream().filter(
        usu -> usu.getId() == id).findAny().orElse(null);

    if (usuario != null) {
      usuarios.removeIf(u -> u.getId() == id);
      return ResponseEntity.ok(usuario);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  static {

    usuarios.add(new Usuario(1, "Maria", "maria", "1234", "FUNC"));
    usuarios.add(new Usuario(2, "Mário", "mario", "1234", "FUNC"));
    usuarios.add(new Usuario(3, "João", "joao", "1234", "CLIENTE"));
    usuarios.add(new Usuario(4, "José", "jose", "1234", "CLIENTE"));
    usuarios.add(new Usuario(5, "Joana", "joana", "1234", "CLIENTE"));
    usuarios.add(new Usuario(6, "Joaquina", "joaquina", "1234", "CLIENTE"));

  }

}
