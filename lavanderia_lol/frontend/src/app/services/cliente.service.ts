import { Injectable } from '@angular/core';
import { Cliente } from '../shared';

const LS_CHAVE: string = "clientes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

listarTodos(): Cliente[] {
    const clientesString = localStorage[LS_CHAVE];
    if (clientesString) {
        return JSON.parse(clientesString) as Cliente[];
    } else {
        return [];
    }
}

  inserir(cliente: Cliente): void {
    let clientes = this.listarTodos();
    if (!clientes) {
      clientes = [];
    }
    const novoId = Math.max(...clientes.map(cliente => (cliente.idCliente || 0)), 0) + 1;
    cliente.idCliente = novoId;
    clientes.push(cliente);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  buscarPorId(id: number): Cliente | undefined {
    const clientes = this.listarTodos();
    return clientes.find(cliente => cliente.idCliente === id);
  }

  atualizar(cliente: Cliente): void {
    const clientes: Cliente[] = this.listarTodos();
      clientes.forEach( (obj, index, objs) => {
        if (cliente.idCliente === obj.idCliente) {
          objs[index] = cliente;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  remover(id: number): void {
    let clientes: Cliente[] = this.listarTodos();
    clientes = clientes.filter(cliente => cliente.idCliente !== id);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }
}