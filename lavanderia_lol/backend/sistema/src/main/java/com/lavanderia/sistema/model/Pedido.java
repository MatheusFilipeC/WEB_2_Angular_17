package com.lavanderia.sistema.model;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    @Getter @Setter
    private int id;

    @Column(name = "data_pedido")
    @Getter @Setter
    private LocalDateTime dataPedido;

    @Column(name = "data_estimativa")
    @Getter @Setter
    private LocalDateTime dataEstimativa;

    @Column(name = "data_coleta")
    @Getter @Setter
    private LocalDateTime dataColeta;

    @Column(name = "data_entrega")
    @Getter @Setter
    private LocalDateTime dataEntrega;

    @Column(name = "data_pagamento")
    @Getter @Setter
    private LocalDateTime dataPagamento;

    @Column(name = "valor_total")
    @Getter @Setter
    private Double valor;

    @Column(name = "prazo")
    @Getter @Setter
    private int prazo;

    @Column(name = "status")
    @Getter @Setter
    private String statusPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cli")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @Getter @Setter
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Getter @Setter
    private List<RoupasPedido> roupas;
}
