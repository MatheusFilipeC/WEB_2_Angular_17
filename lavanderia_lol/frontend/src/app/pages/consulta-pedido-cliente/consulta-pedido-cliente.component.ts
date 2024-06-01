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
export class ConsultaPedidoClienteComponent {
  id: number | null = null;
  pedidos: Pedido[] = [];
  pedido: Pedido | null = null;
  roupas: RoupasPedido [] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";
  
  constructor (private pedidoService: PedidoService) { }

  pedidoEncontrado: boolean = false;
  usuarioLogado = this.pedidoService.usuarioLogado;

  buscarPedido(idPedido: number) {
    this.pedidoEncontrado = false;
    this.pedidoService.buscarPorId(idPedido).subscribe({
      next: (data: Pedido | null) => {
        if (data != null) {
          if (data.cliente.id === this.usuarioLogado.id) {
            this.pedido = data;
            this.roupas = data.roupas || [];
            this.pedidoEncontrado = true;
          } else {
            this.mensagem = "Cliente não possui nenhum pedido com esse número";
          }
        } 
      },
      error: (err) => {
        this.mensagem = "Erro buscando pedido";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
  }

formatarData(data: Date | undefined): string {
  if (data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  } else {
    return 'Sem data estimada';
  }
}
  
}
