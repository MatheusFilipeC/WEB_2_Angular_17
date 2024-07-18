package com.lavanderia.sistema.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.sistema.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
  Optional<Funcionario> findById(int id);
  List<Funcionario> findAllByOrderByIdAsc();
}
