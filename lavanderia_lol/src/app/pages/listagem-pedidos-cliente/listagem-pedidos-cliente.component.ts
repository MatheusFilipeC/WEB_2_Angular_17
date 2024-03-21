import { Component } from '@angular/core';
import { Pedido } from '../../shared/models/pedido.model';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listagem-pedidos-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listagem-pedidos-cliente.component.html',
  styleUrl: './listagem-pedidos-cliente.component.css'
})
export class ListagemPedidosClienteComponent {
  constructor (private pedidoService: PedidoService) { }

  listarPedidos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }
}
