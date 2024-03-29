import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pedido, RoupasPedido, SharedModule } from '../../shared';

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

  roupas: RoupasPedido[] = [];

    roupasPedidos: RoupasPedido[] = [{idPedido: 1, idRoupa: 34, nomeRoupa: 'Camiseta', valorLavagemPeca: 20.00},
    {idPedido: 1, idRoupa: 34, nomeRoupa: 'Camiseta', valorLavagemPeca: 20.00},
    {idPedido: 1, idRoupa: 36, nomeRoupa: 'Short', valorLavagemPeca: 10.00},
    {idPedido: 2, idRoupa: 34, nomeRoupa: 'Camiseta', valorLavagemPeca: 20.00},
    {idPedido: 2, idRoupa: 34, nomeRoupa: 'Calça', valorLavagemPeca: 30.00},
    {idPedido: 2, idRoupa: 34, nomeRoupa: 'Cueca', valorLavagemPeca: 12.00}
  ];
    
    pedidos: Pedido[] = [
      { idPedido: 1, dataPedido: new Date('2023-09-15T14:30:00'), dataEstimativa: new Date('2023-09-15T14:30:00'), dataColeta: new Date('2023-09-15T14:30:00'), 
        dataEntrega: new Date('2023-09-15T14:30:00'), valor: 30.00, statusPedido: 'Em Aberto' },
      { idPedido: 2, dataPedido: new Date('2023-09-20T10:00:00'), dataEstimativa: new Date('2023-09-20T10:00:00'), dataColeta: new Date('2023-09-20T10:00:00'), 
        dataEntrega: new Date('2023-09-20T10:00:00'), valor: 49.90, statusPedido: 'Cancelado' },
      { idPedido: 3, dataPedido: new Date('2023-10-05T08:45:00'), dataEstimativa: new Date('2023-10-05T08:45:00'), dataColeta: new Date('2023-10-05T08:45:00'), 
        dataEntrega: new Date('2023-10-05T08:45:00'), valor: 40.50, statusPedido: 'Recolhido' },
      { idPedido: 4, dataPedido: new Date('2023-10-10T13:15:00'), dataEstimativa: new Date('2023-10-10T13:15:00'), dataColeta: new Date('2023-10-10T13:15:00'), 
        dataEntrega: new Date('2023-10-10T13:15:00'), valor: 110.50, statusPedido: 'Aguardando Pagamento' },
      { idPedido: 5, dataPedido: new Date('2023-11-01T09:30:00'), dataEstimativa: new Date('2023-11-01T09:30:00'), dataColeta: new Date('2023-11-01T09:30:00'), 
        dataEntrega: new Date('2023-11-01T09:30:00'), valor: 60.89, statusPedido: 'Pago' },
      { idPedido: 6, dataPedido: new Date('2023-11-15T16:45:00'), dataEstimativa: new Date('2023-11-15T16:45:00'), dataColeta: new Date('2023-11-15T16:45:00'), 
        dataEntrega: new Date('2023-11-15T16:45:00'), valor: 10.80, statusPedido: 'Finalizado' },
      { idPedido: 7, dataPedido: new Date('2023-08-15T14:30:00'), dataEstimativa: new Date('2023-08-15T14:30:00'), dataColeta: new Date('2023-08-15T14:30:00'), 
        dataEntrega: new Date('2023-08-15T14:30:00'), valor: 60.00, statusPedido: 'Em Aberto' },
      { idPedido: 8, dataPedido: new Date('2023-09-22T14:30:00'), dataEstimativa: new Date('2023-09-22T14:30:00'), dataColeta: new Date('2023-09-22T14:30:00'), 
        dataEntrega: new Date('2023-09-22T14:30:00'), valor: 80.00, statusPedido: 'Em Aberto' },
      { idPedido: 9, dataPedido: new Date('2023-11-25T14:30:00'), dataEstimativa: new Date('2023-11-25T14:30:00'), dataColeta: new Date('2023-11-25T14:30:00'), 
        dataEntrega: new Date('2023-11-25T14:30:00'), valor: 20.00, statusPedido: 'Em Aberto' },
    ];
    
    roupa: RoupasPedido | undefined;
    pedido: number | null = null;
    detalhesPedido: Pedido = {};
    roupasPedido: RoupasPedido | undefined;
    
    buscarPedido(pedidoNumero?: number) {
      const pedidoEncontrado = this.pedidos.find(p => p.idPedido == pedidoNumero);
      
      if (pedidoEncontrado) {
        this.detalhesPedido = pedidoEncontrado;
        this.roupas = this.roupasPedidos.filter(rp => rp.idPedido == pedidoNumero);
      } else {
        this.detalhesPedido = {};
        this.roupas = [];
      }
    }
    
    listarPedidos() {
      return this.roupas.filter(r => r.idPedido === this.pedido);
    }


}
