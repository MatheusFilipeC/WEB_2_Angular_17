package com.lavanderia.sistema.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.lavanderia.sistema.repository.UsuarioRepository;

@CrossOrigin
@RestController

public class UsuarioREST {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public static List<Usuario> usuarios = new ArrayList<>();

  @PostMapping("/login")
  public ResponseEntity<Usuario> login(@RequestBody Login login) {
    Optional <Usuario> op = usuarioRepository.findByEmailAndSenha(login.getLogin(), login.getSenha());
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }

  @GetMapping("/usuarios")
  public ResponseEntity<List<Usuario>> obterTodosUsuarios() {
    List<Usuario> usuarios = usuarioRepository.findAll();
    return ResponseEntity.ok(usuarios);
  }

  @GetMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable int id) {
    Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent())
      return ResponseEntity.ok(op.get());
    else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @PostMapping("/usuarios")
  public ResponseEntity<Usuario> inserirUsuario(@RequestBody Usuario usuario) {
    Optional<Usuario> op = usuarioRepository.findByEmail(usuario.getEmail());
    if (op.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
    } else {
      usuarioRepository.save(usuario);
      return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }
  }

  @PutMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> alterarUsuario(@PathVariable int id, @RequestBody Usuario usuario) {
    Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      usuario.setId(id);
      usuarioRepository.save(usuario);
      return ResponseEntity.ok(usuario);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/usuarios/{id}")
  public ResponseEntity<Usuario> removerUsuario(@PathVariable int id) {
    Optional<Usuario> op = usuarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      usuarioRepository.delete(op.get());
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
