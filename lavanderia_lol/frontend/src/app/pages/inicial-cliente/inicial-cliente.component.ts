import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pedido, SharedModule } from '../../shared';
import { PedidoService } from '../../services';

@Component({
  selector: 'app-inicial-cliente',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    SharedModule
  ],
  templateUrl: './inicial-cliente.component.html',
  styleUrl: './inicial-cliente.component.css'
})
export class InicialClienteComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido [] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";
  
  constructor (private pedidoService: PedidoService) { }

  usuarioLogado = this.pedidoService.usuarioLogado;

  filtrarPedidosUsuarioLogado(): void {
    this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.cliente.id === this.usuarioLogado.id);
  }

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
          this.filtrarPedidosUsuarioLogado();
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de pedidos";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.pedidos;
  }
  
  formatarData(data: Date): string {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }
}
