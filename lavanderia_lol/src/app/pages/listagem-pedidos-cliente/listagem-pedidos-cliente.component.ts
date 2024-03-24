import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services';
import { Pedido, SharedModule } from '../../shared';

@Component({
  selector: 'app-listagem-pedidos-cliente',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    SharedModule
  ],
  templateUrl: './listagem-pedidos-cliente.component.html',
  styleUrl: './listagem-pedidos-cliente.component.css'
})
export class ListagemPedidosClienteComponent {
  constructor (private pedidoService: PedidoService) { }

  listarPedidos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }
}
