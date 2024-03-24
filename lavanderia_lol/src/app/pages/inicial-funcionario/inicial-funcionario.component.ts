import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalRecolhimentoComponent } from '../modal-recolhimento/modal-recolhimento.component';
import { Pedido } from '../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';

@Component({
  selector: 'app-inicial-funcionario',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './inicial-funcionario.component.html',
  styleUrl: './inicial-funcionario.component.css'
})
export class InicialFuncionarioComponent {

  statusSelecionado: string = '';
  
  constructor (private modalService: NgbModal,
    private pedidoService: PedidoService) { }

  listarPedidos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }

  getStatusClass(statusPedido: string | undefined): string {
    switch (statusPedido) {
        case 'Em Aberto':
            return 'bg-warning';
        case 'Cancelado':
            return 'text-white bg-danger';
        case 'Recolhido':
            return 'text-white bg-secondary';
        case 'Aguardando Pagamento':
            return 'text-white bg-primary';
        case 'Pago':
            return 'bg-orange';
        case 'Finalizado':
            return 'text-white bg-success';
        default:
            return '';
    }
}

mostrarBotao(statusPedido: string | undefined): boolean {
  const statusComBotao = ['Em Aberto'];
    return statusPedido !== undefined && statusComBotao.includes(statusPedido);
}

ordenarPedidos(): Pedido[] {
  const pedidosOrdenados = this.listarPedidos().slice();
  pedidosOrdenados.sort((a, b) => {
    const dataA = a.dataPedido ? new Date(a.dataPedido).getTime() : 0;
    const dataB = b.dataPedido ? new Date(b.dataPedido).getTime() : 0;
    return dataA - dataB;
  });
  return pedidosOrdenados;
}

abrirModalRecolhimento(pedido: Pedido) {
  const modalRef = this.modalService.open(ModalRecolhimentoComponent);
  modalRef.componentInstance.pedido = pedido;
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
