package com.lavanderia.sistema.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lavanderia.sistema.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
  Optional<Cliente> findById(int id);
  Optional<Cliente> findByCpf(String cpf);
}
