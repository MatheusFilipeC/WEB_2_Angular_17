package com.lavanderia.sistema.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_roupas_pedido")
public class RoupasPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    @Getter @Setter
    private int id;

    @Column(name = "id_pedido", insertable = false, updatable = false)
    @Getter @Setter
    private int idPedido;

    @Column(name = "id_roupa")
    @Getter @Setter
    private int idRoupa;

    @Column(name = "peca_roupa")
    @Getter @Setter
    private String pecaRoupa;

    @Column(name = "valor_peca")
    @Getter @Setter
    private Double valorPeca;

    @Column(name = "quantidade")
    @Getter @Setter
    private int quantidade;

    @Column(name = "prazo")
    @Getter @Setter
    private int prazo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", referencedColumnName = "id_pedido")
    @JsonBackReference
    @Getter @Setter
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_roupa", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @Setter @Getter
    private Roupa roupa;
}

