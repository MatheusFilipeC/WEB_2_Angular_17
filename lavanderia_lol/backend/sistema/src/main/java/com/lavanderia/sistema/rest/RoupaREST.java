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

import com.lavanderia.sistema.model.Roupa;
import com.lavanderia.sistema.repository.RoupaReposiory;

@CrossOrigin
@RestController

public class RoupaREST {

  @Autowired
  private RoupaReposiory roupaRepository;

  public static List<Roupa> roupas = new ArrayList<>();

  @GetMapping("/roupas")
  public ResponseEntity<List<Roupa>> obterTodasRoupas() {
    List <Roupa> roupas = roupaRepository.findAllByOrderByIdAsc();
    return ResponseEntity.ok(roupas);
  }

  @GetMapping("/roupas/{id}")
  public ResponseEntity<Roupa> obterRoupaPorId(@PathVariable("id") int id) {
    Optional<Roupa> op = roupaRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      return ResponseEntity.ok(op.get());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @PostMapping("/roupas")
  public ResponseEntity<Roupa> inserirRoupa(@RequestBody Roupa roupa) {
    Optional<Roupa> op = roupaRepository.findByPecaRoupa(roupa.getPecaRoupa());
    if (op.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(op.get());
    } else {
      roupa.setId(-1);
      roupa.setHabilitada(false);
      roupaRepository.save(roupa);
      return ResponseEntity.status(HttpStatus.CREATED).body(roupa);
    }
  }

  @PutMapping("/roupas/{id}")
  public ResponseEntity<Roupa> alterarRoupa(@PathVariable("id") int id, @RequestBody Roupa roupa) {
    Optional<Roupa> op = roupaRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      roupa.setPecaRoupa(roupa.getPecaRoupa());
      roupa.setPreco(roupa.getPreco());
      roupa.setPrazo(roupa.getPrazo());
      roupa.setHabilitada(false);
      roupaRepository.save(roupa);
      return ResponseEntity.ok(roupa);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/roupas/{id}")
  public ResponseEntity<Roupa> removerRoupa(@PathVariable("id") int id) {
    Optional<Roupa> op = roupaRepository.findById(Integer.valueOf(id));
    if (op.isPresent()) {
      roupaRepository.delete(op.get());
      return ResponseEntity.ok (op.get());
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
