import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';

@Component({
  selector: 'app-modal-cancelar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-cancelar.component.html',
  styleUrl: './modal-cancelar.component.css'
})
export class ModalCancelarComponent {
  @Input() pedido!: Pedido;

  constructor(public activeModal: NgbActiveModal,
    private pedidoService: PedidoService,) {}

atualizarCancelar(pedido: Pedido): void {
      pedido.statusPedido = "Cancelado";
      this.pedidoService.atualizar(this.pedido);
      this.activeModal.close();
  }
}

