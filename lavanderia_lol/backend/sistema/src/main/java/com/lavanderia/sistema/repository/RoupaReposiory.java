package com.lavanderia.sistema.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.sistema.model.Roupa;

public interface RoupaReposiory extends JpaRepository<Roupa, Integer> {
  Optional<Roupa> findByPecaRoupa(String pecaRoupa);
  Optional<Roupa> findById(int id);
  List<Roupa> findAllByOrderByIdAsc();
}
