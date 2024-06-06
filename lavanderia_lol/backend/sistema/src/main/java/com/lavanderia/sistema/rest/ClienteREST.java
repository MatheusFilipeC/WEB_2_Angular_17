package com.lavanderia.sistema.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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

import com.lavanderia.sistema.model.Cliente;
import com.lavanderia.sistema.model.Usuario;

@CrossOrigin
@RestController

public class ClienteREST {

  public static List<Cliente> clientes = new ArrayList<>();
  private final UsuarioREST usuarioRest;

  public ClienteREST(UsuarioREST usuarioRest) {
    this.usuarioRest = usuarioRest;
  }

  private String gerarSenha() {
    Random random = new Random();
    StringBuilder stringBuilder = new StringBuilder();

    for (int i = 0; i < 4; i++) {
      int digit = random.nextInt(10); // Gera um número aleatório de 0 a 9
      stringBuilder.append(digit);
    }

    return stringBuilder.toString();
  }

  @GetMapping("/clientes")
  public ResponseEntity<List<Cliente>> obterTodosClientes() {

    return ResponseEntity.ok(clientes);
  }

  @GetMapping("/clientes/{id}")
  public ResponseEntity<Cliente> obterClientePorId(@PathVariable("id") int id) {

    Cliente c = clientes.stream().filter(
        cli -> cli.getId() == id).findAny().orElse(null);

    if (c == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    else
      return ResponseEntity.ok(c);
  }

  @PostMapping("/clientes")
  public ResponseEntity<Cliente> inserirCliente(@RequestBody Cliente cliente) {


    Cliente c = clientes.stream().filter(
        cli -> cli.getCpf().equals(cliente.getCpf())).findAny().orElse(null);   

    if (c != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    String senhaGerada = gerarSenha();

    Usuario usuario = new Usuario(0, cliente.getNome(), cliente.getEmail(), senhaGerada, "CLIENTE");

    ResponseEntity<Usuario> response = usuarioRest.inserirUsuario(usuario);
    if (response.getStatusCode() == HttpStatus.CONFLICT) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    Usuario usuarioCriado = response.getBody();
    cliente.setId(usuarioCriado.getId());
    cliente.setSenha(usuarioCriado.getSenha());

    clientes.add(cliente);
    System.out.println("Cliente criado: " + cliente);
    return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
  }

  @PutMapping("/clientes/{id}")
  public ResponseEntity<Cliente> alterarCliente(@PathVariable("id") int id, @RequestBody Cliente cliente) {

    Cliente c = clientes.stream().filter(
        usu -> usu.getId() == id).findAny().orElse(null);

    if (c != null) {
      c.setNome(cliente.getNome());
      c.setEmail(cliente.getEmail());
      c.setTelefone(cliente.getTelefone());
      c.setSenha(cliente.getSenha());
      c.setCpf(cliente.getCpf());
      c.setEndereco(cliente.getEndereco());
      c.setNumero(cliente.getNumero());
      c.setComplemento(cliente.getComplemento());
      c.setBairro(cliente.getBairro());
      c.setCidade(cliente.getCidade());
      c.setUf(cliente.getUf());

      return ResponseEntity.ok(c);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @DeleteMapping("/clientes/{id}")
  public ResponseEntity<Cliente> removerCliente(@PathVariable("id") int id) {

    Cliente cliente = clientes.stream().filter(
        usu -> usu.getId() == id).findAny().orElse(null);

    if (cliente != null) {
      clientes.removeIf(u -> u.getId() == id);
      return ResponseEntity.ok(cliente);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  static {

    clientes.add(new Cliente(3, "João", "joao@mail.com", "22222222222"));
    clientes.add(new Cliente(4, "José", "jose@mail.com", "33333333333"));
    clientes.add(new Cliente(5, "Joana", "joana@mail.com", "44444444444"));
    clientes.add(new Cliente(6, "Joaquina", "joaquina@mail.com","55555555555"));
    clientes.add(new Cliente(8, "Cliente", "cliente","66666666666"));

  }

}
