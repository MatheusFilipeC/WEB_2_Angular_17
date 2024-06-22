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

import com.lavanderia.sistema.model.Roupa;

@CrossOrigin
@RestController

public class RoupaREST {

  public static List<Roupa> roupas = new ArrayList<>();

  @GetMapping("/roupas")
  public ResponseEntity<List<Roupa>> obterTodasRoupas() {

    return ResponseEntity.ok(roupas);
  }

  @GetMapping("/roupas/{id}")
  public ResponseEntity<Roupa> obterRoupaPorId(@PathVariable int id) {

    Roupa r = roupas.stream().filter(
        rou -> rou.getId() == id).findAny().orElse(null);

    if (r == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    else
      return ResponseEntity.ok(r);
  }

  @PostMapping("/roupas")
  public ResponseEntity<Roupa> inserirRoupa(@RequestBody Roupa roupa) {

    Roupa r = roupas.stream().filter(
        rou -> rou.getPecaRoupa().equals(roupa.getPecaRoupa())).findAny().orElse(null);

    if (r != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    r = roupas.stream().max(Comparator.comparing(Roupa::getId)).orElse(null);

    if (r == null)
      roupa.setId(1);
    else
      roupa.setId(r.getId() + 1);
      roupa.setHabilitada(false);
    roupas.add(roupa);
    return ResponseEntity.status(HttpStatus.CREATED).body(roupa);
  }

  @PutMapping("/roupas/{id}")
  public ResponseEntity<Roupa> alterarRoupa(@PathVariable int id, @RequestBody Roupa roupa) {

    Roupa r = roupas.stream().filter(
        rou -> rou.getId() == id).findAny().orElse(null);

    if (r != null) {
      r.setPecaRoupa(roupa.getPecaRoupa());
      r.setPreco(roupa.getPreco());
      r.setPrazo(roupa.getPrazo());
      return ResponseEntity.ok(r);
    } else
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }

  @DeleteMapping("/roupas/{id}")
  public ResponseEntity<Roupa> removerRoupa(@PathVariable int id) {

    Roupa roupa = roupas.stream().filter(
        rou -> rou.getId() == id).findAny().orElse(null);

    if (roupa != null) {
      roupas.removeIf(r -> r.getId() == id);
      return ResponseEntity.ok(roupa);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

    static {

    roupas.add(new Roupa(1, "Camiseta", 20.00, 2, false));
    roupas.add(new Roupa(2, "Calça Jeans", 40.00, 3, false));
    roupas.add(new Roupa(3, "Camisa", 50.00, 4, false));
    roupas.add(new Roupa(4, "Cueca", 10.00, 1, false));
    roupas.add(new Roupa(5, "Meia", 5.00, 1, false));

  }

}
