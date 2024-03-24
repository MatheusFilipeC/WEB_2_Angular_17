import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter',
})
export class StatusFilterPipe implements PipeTransform {

  transform(pedidos: any[], statusSelecionado: string): any[] {
    if(!statusSelecionado || statusSelecionado === '') {
      return pedidos;
    }
      return pedidos.filter(pedido => pedido.statusPedido === statusSelecionado);
  }

}
