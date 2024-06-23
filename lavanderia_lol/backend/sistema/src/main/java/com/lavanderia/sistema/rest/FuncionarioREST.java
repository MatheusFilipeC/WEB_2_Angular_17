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

import com.lavanderia.sistema.model.Funcionario;
import com.lavanderia.sistema.model.Usuario;
import com.lavanderia.sistema.repository.FuncionarioRepository;
import com.lavanderia.sistema.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@CrossOrigin
@RestController

public class FuncionarioREST {

  @Autowired private FuncionarioRepository funcionarioRepository;
  @Autowired private UsuarioRepository usuarioRepository;

  public static List<Funcionario> funcionarios = new ArrayList<>();
  private final UsuarioREST usuarioRest;

  public FuncionarioREST(UsuarioREST usuarioRest) {
    this.usuarioRest = usuarioRest;
  }

  @GetMapping("/funcionarios")
  public ResponseEntity<List<Funcionario>> obterTodosFuncionarios() {
    List <Funcionario> funcionarios = funcionarioRepository.findAllByOrderByIdAsc();
    return ResponseEntity.ok(funcionarios);
  }

  @GetMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> obterFuncionarioPorId(@PathVariable int id) {
    Optional<Funcionario> op = funcionarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent())
      return ResponseEntity.ok(op.get());
    else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @PostMapping("/funcionarios")
  @Transactional
  public ResponseEntity<Funcionario> inserirFuncionario(@RequestBody Funcionario funcionario) {

      Usuario usuario = new Usuario();
      usuario.setNome(funcionario.getNome());
      usuario.setEmail(funcionario.getEmail());
      usuario.setSenha(funcionario.getSenha());
      usuario.setPerfil("FUNC");
  
      ResponseEntity<Usuario> responseUsuario = usuarioRest.inserirUsuario(usuario);
  
      if (responseUsuario.getStatusCode() == HttpStatus.CONFLICT) {
          return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }
  
      Usuario usuarioCriado = responseUsuario.getBody();
      if (usuarioCriado == null || usuarioCriado.getId() == 0) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
  
      int idUsuario = usuarioCriado.getId();
      funcionario.setId(idUsuario);
      funcionario.setHabilitada(false);
  
      funcionarioRepository.save(funcionario);
      return ResponseEntity.status(HttpStatus.CREATED).body(funcionario);
  }
  

  @PutMapping("/funcionarios/{id}")
  @Transactional
  public ResponseEntity<Funcionario> alterarFuncionario(@PathVariable int id,
      @RequestBody Funcionario funcionario) {

    Optional<Funcionario> op = funcionarioRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      Funcionario funcionarioExistente = op.get();

      funcionarioExistente.setNome(funcionario.getNome());
      funcionarioExistente.setEmail(funcionario.getEmail());
      funcionarioExistente.setSenha(funcionario.getSenha());
      funcionarioExistente.setDataNascimento(funcionario.getDataNascimento());
      funcionarioExistente.setHabilitada(false);
      funcionarioRepository.save(funcionarioExistente);

      Optional<Usuario> usuarioOptional = usuarioRepository.findById(funcionarioExistente.getId());
      if (usuarioOptional.isPresent()) {
          Usuario usuarioExistente = usuarioOptional.get();
          usuarioExistente.setNome(funcionario.getNome());
          usuarioExistente.setEmail(funcionario.getEmail());
          usuarioExistente.setSenha(funcionario.getSenha());
          usuarioRepository.save(usuarioExistente);
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

      return ResponseEntity.ok(funcionarioExistente);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

  }

  @DeleteMapping("/funcionarios/{id}")
  @Transactional
  public ResponseEntity<Funcionario> removerUsuario(@PathVariable int id) {
      Optional<Funcionario> op = funcionarioRepository.findById(Integer.valueOf(id));
      if (op.isPresent()) {
          Funcionario funcionario = op.get();
          
          funcionarioRepository.delete(funcionario);
  
          Optional<Usuario> usuarioOptional = usuarioRepository.findById(funcionario.getId());
          usuarioOptional.ifPresent(usuario -> {
            usuarioRepository.delete(usuario);
          });
  
          return ResponseEntity.ok(funcionario);
      } else {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
  }
  

}
