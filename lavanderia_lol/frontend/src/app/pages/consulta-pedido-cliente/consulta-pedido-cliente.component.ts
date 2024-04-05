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

  roupasPedidos: RoupasPedido[] = [{idPedido: 1, idRoupa: 34, nomeRoupa: 'Camiseta', valorLavagemPeca: 20.00},
    {idPedido: 1, idRoupa: 34, nomeRoupa: 'Camiseta', valorLavagemPeca: 20.00},
    {idPedido: 1, idRoupa: 36, nomeRoupa: 'Short', valorLavagemPeca: 10.00},
    {idPedido: 2, idRoupa: 34, nomeRoupa: 'Camiseta', valorLavagemPeca: 20.00},
    {idPedido: 2, idRoupa: 34, nomeRoupa: 'Calça', valorLavagemPeca: 30.00},
    {idPedido: 2, idRoupa: 34, nomeRoupa: 'Cueca', valorLavagemPeca: 12.00}
  ];
    
  roupa: RoupasPedido | undefined;
  pedido: number | null = null;
  detalhesPedido: Pedido = {};
  roupasPedido: RoupasPedido | undefined;
    
  buscarPedido(pedidoNumero?: number) {
    this.detalhesPedido = this.pedidoService.buscarPorId(pedidoNumero || 0) || {};
    this.roupas = this.roupasPedidos.filter(rp => rp.idPedido == pedidoNumero);
  }
}
