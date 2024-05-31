import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pedido, RoupasPedido, SharedModule } from '../../shared';
import { PedidoService } from '../../services';

@Component({
  selector: 'app-consulta-pedido-cliente',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    SharedModule
  ],
  templateUrl: './consulta-pedido-cliente.component.html',
  styleUrl: './consulta-pedido-cliente.component.css'
})
export class ConsultaPedidoClienteComponent implements OnInit {
  pedido: number | null = null;
  pedidos: Pedido[] = [];
  detalhesPedido: Pedido | null = null;
  roupas: RoupasPedido [] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";
  
  constructor (private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos(): Pedido[] {
    this.pedidoService.listarTodos().subscribe({
      next: (data: Pedido[] | null) => {
        if (data == null) {
          this.pedidos = [];
        } else {
          this.pedidos = data;
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de pedidos";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.pedidos;
  }
    
  buscarPedido(pedidoNumero?: number) {
    if (pedidoNumero != null && pedidoNumero > 0) {
      this.pedidoService.buscarPorId(pedidoNumero).subscribe({
        next: (data: Pedido | null) => {
          if (data != null) {
            this.detalhesPedido = data;
            this.roupas = data.roupas || [];
          } else {
            this.detalhesPedido = null;
            this.roupas = [];
            this.mensagem = "Pedido não encontrado";
          }
        },
        error: (err) => {
          this.detalhesPedido = null;
          this.roupas = [];
          this.mensagem = "Erro buscando pedido";
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      });
    } else {
      this.detalhesPedido = null;
      this.roupas = [];
      this.mensagem = "Número do pedido inválido";
    }
  }
}
