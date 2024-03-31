import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';

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
    private pedidoService: PedidoService) {}

    atualizarPagamento(pedido: Pedido): void {
      pedido.statusPedido = "Pago";
      this.pedidoService.atualizar(this.pedido);
      this.activeModal.close();
    }
  }
