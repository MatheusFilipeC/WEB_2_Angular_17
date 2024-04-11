/*
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[]; // Lista de todos os pedidos
  filteredOrders: any[]; // Lista de pedidos filtrados
  filter: string = 'all'; // Filtro inicial
  startDate: string; // Data de início para filtro personalizado
  endDate: string; // Data de término para filtro personalizado

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // Ao inicializar o componente, obtemos os pedidos do serviço
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders; // Inicialmente, os pedidos filtrados são os mesmos que os pedidos totais
    });
  }

  filterOrders(): void {
    if (this.filter === 'all') {
      // Se o filtro for "Todos", exibimos todos os pedidos
      this.filteredOrders = this.orders;
    } else if (this.filter === 'today') {
      // Se o filtro for "Hoje", filtramos os pedidos para mostrar apenas os do dia atual
      const today = new Date().toDateString(); // Obtém a data atual como uma string
      this.filteredOrders = this.orders.filter(order => new Date(order.date).toDateString() === today);
    } else if (this.filter === 'custom') {
      // Se o filtro for "Personalizado", filtramos os pedidos para mostrar apenas os dentro do intervalo especificado
      const startDate = new Date(this.startDate); // Converte a data de início para um objeto Date
      const endDate = new Date(this.endDate); // Converte a data de término para um objeto Date
      this.filteredOrders = this.orders.filter(order => {
        const orderDate = new Date(order.date); // Converte a data do pedido para um objeto Date
        // Verifica se a data do pedido está dentro do intervalo especificado
        return orderDate >= startDate && orderDate <= endDate;
      });
    }
  }
}
*/