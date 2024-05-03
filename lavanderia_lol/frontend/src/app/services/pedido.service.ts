import { Injectable } from '@angular/core';
import { Pedido, Usuario } from '../shared';
import { pedidosHardCode } from '../shared/pedidos-hardcode';
import { LoginService } from './login.service';

const LS_CHAVE: string = "Pedidos";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private loginService: LoginService) { }

  usuarioLogado = this.loginService.usuarioLogado;

  listarTodos(): Pedido[] {
    const pedidosLocalStorage = localStorage[LS_CHAVE];
    const pedidosCadastrados: Pedido[] = pedidosHardCode;
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
  pedido.dataEntrega = this.adicionarDias(pedido.dataColeta, this.encontrarMaior(pedido));
  pedido.dataEstimativa = pedido.dataEntrega;
  pedido.statusPedido = 'Em Aberto';
  pedidos.push(pedido);
  localStorage[LS_CHAVE] = JSON.stringify(pedidos);
}

buscarPorId(id: number): Pedido | undefined {
  const pedidos = this.listarTodos();
  return pedidos.find(pedido => pedido.idPedido == id);
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
  location.reload();
}
}