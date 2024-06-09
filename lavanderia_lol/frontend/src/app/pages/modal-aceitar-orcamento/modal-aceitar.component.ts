import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cliente, Pedido } from '../../shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';
import { ModalDadosPedidoComponent } from '../modal-pedido-confirmado/modal-dados-pedido.component';
import { ClienteService } from '../../services/cliente.service';

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
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(
    public activeModal: NgbActiveModal,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private modalService: NgbModal
  ) { }

  usuarioLogado = this.pedidoService.usuarioLogado;

  realizarPedido(pedido: Pedido): void {
    this.clienteService.buscarPorId(this.usuarioLogado.id).subscribe({
      next: (cliente: Cliente | null) => {
        if (cliente !== null) {
          pedido.cliente = cliente;
          this.pedidoService.inserir(pedido).subscribe({
            next: (response: Pedido | null) => {
              if (response !== null) {
                this.pedido = response;
                this.activeModal.close();
                this.abrirModalDadosPedido(this.pedido);
              } else {
                this.mensagem = 'Pedido não encontrado';
              }
            },
            error: (err) => {
              this.mensagem = `Erro ao realizar pedido ${pedido.id}`;
              this.mensagem_detalhes = `[${err.status}] ${err.message}`
            }
          });
        } else {
          this.mensagem = 'Cliente não encontrado';
        }
      },
      error: (err) => {
        this.mensagem = `Erro ao obter dados do cliente`;
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
  }

  abrirModalDadosPedido(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalDadosPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  naoConfirma() {
    this.activeModal.close()
    location.reload();
  }

  determinarPrazo(pedido: Pedido): number {
    if (pedido.roupas !== undefined) {
      return pedido.roupas.reduce((maxPrazo, roupa) => Math.max(maxPrazo, roupa.prazo || 0), 0);
    } else {
      return 0;
    }
  }

}