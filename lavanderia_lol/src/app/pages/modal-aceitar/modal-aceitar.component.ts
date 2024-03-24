import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';
import { ModalDadosPedidoComponent } from '../modal-dados-pedido/modal-dados-pedido.component';
import { RouterModule } from '@angular/router';

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
}