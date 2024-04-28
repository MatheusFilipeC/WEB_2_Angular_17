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

import com.lavanderia.sistema.model.Funcionario;
import com.lavanderia.sistema.model.Usuario;

@CrossOrigin
@RestController

public class FuncionarioREST {

  public static List<Usuario> usuarios = UsuarioREST.obterTodosUsuarios();
  public static List<Funcionario> funcionarios = new ArrayList<>();

  @GetMapping("/funcionarios")
  public ResponseEntity<List<Funcionario>> obterTodosClientes() {

    return ResponseEntity.ok(funcionarios);
  }

  @GetMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> obterFuncionarioPorId(@PathVariable("id") int id) {

    Funcionario f = funcionarios.stream().filter(func -> func.getId() == id).findAny().orElse(null);

    if (f == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    else
      return ResponseEntity.ok(f);
  }

  @PostMapping("/funcionarios")
  public ResponseEntity<Funcionario> inserirFuncionario(@RequestBody Funcionario funcionario) {

    Usuario u = usuarios.stream().filter(
        func -> func.getEmail().equals(funcionario.getEmail())).findAny().orElse(null);

    if (u != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    u = usuarios.stream().max(Comparator.comparing(Usuario::getId)).orElse(null);

    if (u == null)
      funcionario.setId(1);
    else
      funcionario.setId(u.getId() + 1);

    Usuario usuario = new Usuario(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(),
        funcionario.getSenha(), "FUNC");
    usuarios.add(usuario);

    funcionario.setPerfil("FUNC");
    funcionario.setHabilitada(false);
    funcionarios.add(funcionario);
    
    return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
  }

  @PutMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> alterarFuncionario(@PathVariable("id") int id,
      @RequestBody Funcionario funcionario) {

    Funcionario f = funcionarios.stream().filter(
        func -> func.getId() == id).findAny().orElse(null);

    if (f != null) {
      f.setNome(funcionario.getNome());
      f.setEmail(funcionario.getEmail());
      f.setSenha(funcionario.getSenha());
      f.setDataNascimento(funcionario.getDataNascimento());
      return ResponseEntity.ok(f);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @DeleteMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> removerFuncionario(@PathVariable("id") int id) {

    Funcionario funcionario = funcionarios.stream().filter(
        func -> func.getId() == id).findAny().orElse(null);

    if (funcionario != null) {
      funcionarios.removeIf(f -> f.getId() == id);
      return ResponseEntity.ok(funcionario);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  static {

    funcionarios.add(new Funcionario(1, "Maria", "maria@mail.com"));
    funcionarios.add(new Funcionario(2, "Mário", "mario@mail.com"));

  }

}
