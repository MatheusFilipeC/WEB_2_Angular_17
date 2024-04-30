import { Component } from '@angular/core';
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
export class InicialClienteComponent {
  pedidos: Pedido[] = [];
  
  constructor (private pedidoService: PedidoService) { 
    this.pedidos = pedidoService.listarTodos();
  }

  listarPedidos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }
  
  formatarData(data: Date): string {
    const dataObj = new Date(data);
  
    if (isNaN(dataObj.getTime())) {
      return 'Data inválida';
    }
  
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); 
    const ano = String(dataObj.getFullYear());
    const hora = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
  
    return `${dia}-${mes}-${ano} ${hora}:${minutos}`;
  }
}
