package com.lavanderia.sistema.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lavanderia.sistema.model.Cliente;
import com.lavanderia.sistema.model.Usuario;
import com.lavanderia.sistema.repository.ClienteRepository;

import jakarta.transaction.Transactional;

@CrossOrigin
@RestController

public class ClienteREST {

  @Autowired private ClienteRepository clienteRepository;

  public static List<Cliente> clientes = new ArrayList<>();
  private final UsuarioREST usuarioRest;

  public ClienteREST(UsuarioREST usuarioRest) {
    this.usuarioRest = usuarioRest;
  }

  private String gerarSenha() {
    Random random = new Random();
    StringBuilder stringBuilder = new StringBuilder();

    for (int i = 0; i < 4; i++) {
      int digit = random.nextInt(10);
      stringBuilder.append(digit);
    }

    return stringBuilder.toString();
  }

  @GetMapping("/clientes")
  public ResponseEntity<List<Cliente>> obterTodosClientes() {
    List<Cliente> clientes = clienteRepository.findAll();
    return ResponseEntity.ok(clientes);
  }

  @GetMapping("/clientes/{id}")
  
  public ResponseEntity<Cliente> obterClientePorId(@PathVariable("id") int id) {
    Optional<Cliente> op = clienteRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      return ResponseEntity.ok (op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/clientes")
  @Transactional
  public ResponseEntity<Cliente> inserirCliente(@RequestBody Cliente cliente) {

      Usuario usuario = new Usuario();
      usuario.setNome(cliente.getNome());
      usuario.setEmail(cliente.getEmail());
      usuario.setSenha(gerarSenha());
      usuario.setPerfil("CLIENTE");

      Optional<Cliente> op = clienteRepository.findByCpf(cliente.getCpf());
  
      ResponseEntity<Usuario> responseUsuario = usuarioRest.inserirUsuario(usuario);
  
      if (responseUsuario.getStatusCode() == HttpStatus.CONFLICT || op.isPresent()) {
          return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }
  
      Usuario usuarioCriado = responseUsuario.getBody();
      if (usuarioCriado == null || usuarioCriado.getId() == 0) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }

      cliente.setId(usuarioCriado.getId());
      cliente.setSenha(usuarioCriado.getSenha());
  
      clienteRepository.save(cliente);
      return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
  }

}
