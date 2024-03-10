import { Injectable } from '@angular/core';

import { Pedido } from '../shared/models/pedido.model';

const LS_CHAVE: string = "Pedidos";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  listarTodos(): Pedido[] {
    const pedidosLocalStorage = localStorage[LS_CHAVE];
    const pedidosCadastrados: Pedido[] = [
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
    let pedidos = pedidosLocalStorage ? JSON.parse(pedidosLocalStorage) : [];
    const pedidosCadastradosAdicionados = pedidos.some(
      (cadastrado: Pedido) => pedidosCadastrados.some((c) => c.idPedido === cadastrado.idPedido));
      if (!pedidosCadastradosAdicionados) {
    pedidos = pedidos.concat(pedidosCadastrados); 
      }
  return pedidos;
}

inserir(pedido: Pedido): void {
  const pedidos = this.listarTodos();
  const novoId = Math.max(...pedidos.map(pedido => (pedido.idPedido || 0)), 0) + 1;
  pedido.idPedido = novoId;
  pedido.dataPedido = new Date();
  pedido.dataColeta = this.adicionarHoras(new Date(), 2);
  pedido.dataEntrega = this.adicionarDias(new Date(), this.encontrarMaior(pedido));
  pedido.dataEstimativa = pedido.dataEntrega;
  pedido.statusPedido = 'Em Aberto';
  pedidos.push(pedido);
  localStorage[LS_CHAVE] = JSON.stringify(pedidos);
}

atualizar(pedido: Pedido): void {
  const pedidos: Pedido[] = this.listarTodos();
  pedidos.forEach( (obj, index, objs) => {
    if (pedido.idPedido === obj.idPedido) {
      objs[index] = pedido;
    }
  });
  localStorage[LS_CHAVE] = JSON.stringify(pedidos);
}

remover(id: number): void {
  let pedidos: Pedido[] = this.listarTodos();
  pedidos = pedidos.filter(pedido => pedido.idPedido !== id);
  localStorage[LS_CHAVE] = JSON.stringify(pedidos);
}

adicionarDias(data: Date, dias: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  return novaData;
}

adicionarHoras(data: Date, horas: number) {
  const novaData = new Date(data);
  novaData.setHours(novaData.getHours() + horas);
  return novaData;
}

encontrarMaior(pedido: Pedido): number {
  if (pedido.roupas !== undefined) {
  return pedido.roupas.reduce((maxPrazo, roupa) => Math.max(maxPrazo, roupa.prazo || 0), 0);
  } else {
    return 0;
  }
}

recusarOrcamento (pedido: Pedido) {
  const pedidos = this.listarTodos();
  const novoId = Math.max(...pedidos.map(pedido => (pedido.idPedido || 0)), 0) + 1;
  pedido.idPedido = novoId;
  pedido.dataPedido = new Date();
  pedido.statusPedido = 'Rejeitado';
  pedidos.push(pedido);
  localStorage[LS_CHAVE] = JSON.stringify(pedidos);
  console.log(pedido);
}
}