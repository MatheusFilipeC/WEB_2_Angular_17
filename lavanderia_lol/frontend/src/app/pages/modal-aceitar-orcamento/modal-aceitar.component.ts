import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';
import { ModalDadosPedidoComponent } from '../modal-pedido-confirmado/modal-dados-pedido.component';

@Component({
  selector: 'app-modal-aceitar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-aceitar.component.html',
  styleUrl: './modal-aceitar.component.css'
})
export class ModalAceitarComponent {
  @Input() pedido!: Pedido;

  constructor(
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private pedidoService: PedidoService) {}

    realizarPedido(pedido: Pedido): void {
      this.pedidoService.inserir(pedido);
      this.activeModal.close();
      this.abrirModalDadosPedido(this.pedido);
    }

    abrirModalDadosPedido(pedido: Pedido) {
      const modalRef = this.modalService.open(ModalDadosPedidoComponent);
      modalRef.componentInstance.pedido = pedido;
    }

    encontrarMaior(pedido: Pedido): number {
        return this.pedidoService.encontrarMaior(pedido)
    }

    naoConfirma() {
      this.activeModal.close()
      location.reload();
    }
}