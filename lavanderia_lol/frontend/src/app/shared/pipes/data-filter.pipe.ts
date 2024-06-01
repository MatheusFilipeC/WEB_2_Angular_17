import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../models';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(pedidos: Pedido[], filtro: string) {
    if (!pedidos || !filtro) {
      return pedidos; 
    }

    return pedidos.filter(pedido => {
      if (!pedido.dataPedido) {
        return false; 
      }

      const hoje = new Date();
      const dataPedido = new Date(pedido.dataPedido);
      const anoPedido = dataPedido.getFullYear();
      const mesPedido = dataPedido.getMonth();
      const diaPedido = dataPedido.getDate();

      switch (filtro) {
        case 'hoje':
          return dataPedido.toDateString() === hoje.toDateString();
          case 'semana':
            const inicioSemana = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - hoje.getDay() + (hoje.getDay() === 0 ? -6 : 1));
            const fimSemana = new Date(inicioSemana);
            fimSemana.setDate(fimSemana.getDate() + 6);
            return dataPedido >= inicioSemana && dataPedido <= fimSemana;
        case 'mes':
          return mesPedido === hoje.getMonth() && anoPedido === hoje.getFullYear();
        case 'ano':
          return anoPedido === hoje.getFullYear();
        default:
          return true;
      }
    });
  }
}
