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

import com.lavanderia.sistema.model.Cliente;
import com.lavanderia.sistema.model.Usuario;

@CrossOrigin
@RestController

public class ClienteREST {

  public static List<Usuario> usuarios = UsuarioREST.obterTodosUsuarios();
  public static List<Cliente> clientes = new ArrayList<>();

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

    Usuario u = usuarios.stream().filter(
        usu -> usu.getEmail().equals(cliente.getEmail())).findAny().orElse(null);

    if (u != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    u = usuarios.stream().max(Comparator.comparing(Usuario::getId)).orElse(null);

    if (u == null)
      cliente.setId(1);
    else
      cliente.setId(u.getId() + 1);

    cliente.setPerfil("CLIENTE");

    Usuario usuario = new Usuario(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getSenha(),
        "CLIENTE");
    usuarios.add(usuario);
    clientes.add(cliente);
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

    clientes.add(new Cliente(3, "João", "joao@mail.com"));
    clientes.add(new Cliente(4, "José", "jose@mail.com"));
    clientes.add(new Cliente(5, "Joana", "joana@mail.com"));
    clientes.add(new Cliente(6, "Joaquina", "joaquina@mail.com"));

  }

}
