import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';
import { ModalPagamentoRealizadoComponent } from '../modal-pagamento-realizado/modal-pagamento-realizado.component';

@Component({
  selector: 'app-modal-pedido',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-pedido.component.html',
  styleUrl: './modal-pedido.component.css'
})
export class ModalPedidoComponent {
  @Input() pedido!: Pedido;

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private pedidoService: PedidoService) { }

    atualizarPagamento(pedido: Pedido): void {
      pedido.statusPedido = "Pago";
      pedido.dataPagamento = new Date();
      this.activeModal.close();
      this.pedidoService.atualizar(this.pedido).subscribe({
      });
      this.abrirModalPagamento(pedido);
    }
 
  abrirModalPagamento(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalPagamentoRealizadoComponent);
    modalRef.componentInstance.pedido = pedido;
  }
  }
