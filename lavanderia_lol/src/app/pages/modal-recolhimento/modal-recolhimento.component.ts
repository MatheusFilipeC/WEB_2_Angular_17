import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';
import { Pedido } from '../../shared';
import { ModalConfirmadoComponent } from '../modal-confirmado/modal-confirmado.component';

@Component({
  selector: 'app-modal-recolhimento',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-recolhimento.component.html',
  styleUrl: './modal-recolhimento.component.css'
})
export class ModalRecolhimentoComponent {
  @Input() pedido!: Pedido;

  constructor(public activeModal: NgbActiveModal, 
              private modalService: NgbModal, 
              private pedidoService: PedidoService) {}

  recolher($event: any, pedido: Pedido): void {
    $event.preventDefault();
    this.activeModal.close();
    this.abrirModalConfirmado(pedido)
      pedido.statusPedido = "Recolhido";
      this.pedidoService.atualizar(this.pedido);
  }

  abrirModalConfirmado(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalConfirmadoComponent);
    modalRef.componentInstance.pedido = pedido;
  }
}