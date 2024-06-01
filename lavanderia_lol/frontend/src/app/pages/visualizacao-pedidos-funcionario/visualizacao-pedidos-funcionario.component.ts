import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services';
import { Pedido, SharedModule } from '../../shared';
import { ModalRecolhimentoComponent } from '../modal-confirma-recolhimento/modal-recolhimento.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-visualizacao-pedidos-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  templateUrl: './visualizacao-pedidos-funcionario.component.html',
  styleUrl: './visualizacao-pedidos-funcionario.component.css'
})

export class VisualizacaoPedidosFuncionarioComponent implements OnInit {
  pedidos: Pedido[] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";
  statusSelecionado: string = '';
  filtroData: string = "";
  
  constructor (private pedidoService: PedidoService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos(): Pedido[] {
    this.pedidoService.listarTodos().subscribe({
      next: (data: Pedido[] | null) => {
        if (data == null) {
          this.pedidos = [];
        } else {
          this.pedidos = data;
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de pedidos";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.pedidos;
  }

  getStatusClass(statusPedido: string | undefined): string {
    switch (statusPedido) {
        case 'Em Aberto':
            return 'bg-warning';
        case 'Cancelado':
            return 'text-white bg-danger';
        case 'Rejeitado':
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

  getBotaoTexto(statusPedido: string | undefined): string {
    switch (statusPedido) {
        case 'Em Aberto':
            return 'Confirmar Recolhimento';
        case 'Recolhido':
            return 'Confirmar Lavagem';
        case 'Pago':
            return 'Finalizar Pedido';
        default:
            return '';
    }
  }

  mostrarBotao(statusPedido: string | undefined): boolean {
    const statusComBotao = ['Em Aberto', 'Recolhido', 'Pago'];
      return statusPedido !== undefined && statusComBotao.includes(statusPedido);
  }

  efetuarAcao(nomeFuncao: string, pedido: any): void {
    switch (nomeFuncao) {
        case 'Confirmar Recolhimento':
            this.confirmarRecolhimento(pedido);
            break;
        case 'Confirmar Lavagem':
            this.confirmarLavagem(pedido);
            break;
        case 'Finalizar Pedido':
            this.finalizarPedido(pedido);
            break;
    }
  }

  confirmarRecolhimento(pedido: Pedido): void {
    const modalRef = this.modalService.open(ModalRecolhimentoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  confirmarLavagem(pedido: Pedido): void {
    pedido.statusPedido = "Aguardando Pagamento";
    this.pedidoService.atualizar(pedido).subscribe({
    });
}

  finalizarPedido(pedido: Pedido): void {
    pedido.statusPedido = "Finalizado";
    this.pedidoService.atualizar(pedido).subscribe({
    });
}

  ordenarPedidos(): Pedido[] {
    const pedidosOrdenados = this.pedidos.slice();
    pedidosOrdenados.sort((a, b) => {
      const dataA = a.dataPedido ? new Date(a.dataPedido).getTime() : 0;
      const dataB = b.dataPedido ? new Date(b.dataPedido).getTime() : 0;
      return dataA - dataB;
    });
    return pedidosOrdenados;
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

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

}

