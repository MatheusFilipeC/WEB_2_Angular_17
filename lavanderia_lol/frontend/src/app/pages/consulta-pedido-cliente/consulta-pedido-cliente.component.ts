import { Component } from '@angular/core';
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
  pedidos: Pedido[] = [];
  
  constructor (private pedidoService: PedidoService) { 
    this.pedidos = pedidoService.listarTodos();
  }

  roupas: RoupasPedido[] = [];    
  roupa: RoupasPedido | undefined;
  pedido: number | null = null;
  detalhesPedido: Pedido = {};
  roupasPedido: RoupasPedido | undefined;
    
  buscarPedido(pedidoNumero?: number) {
    this.detalhesPedido = this.pedidoService.buscarPorId(pedidoNumero || 0) || {};
    if (this.detalhesPedido && this.detalhesPedido.roupas) {
      this.roupas = this.detalhesPedido.roupas.filter(rp => rp.idPedido == pedidoNumero);
    } else {
      this.roupas = [];
    }
  }
}
