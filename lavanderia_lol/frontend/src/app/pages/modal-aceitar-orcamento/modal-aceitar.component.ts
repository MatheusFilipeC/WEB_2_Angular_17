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
          pedido.dataPedido = new Date();
          let dataColeta = new Date(pedido.dataPedido);
          dataColeta.setHours(dataColeta.getHours() + 4);
          pedido.dataColeta = dataColeta;
          pedido.prazo = this.pedidoService.determinarPrazo(pedido);
          let dataEntrega = new Date(dataColeta);
          dataEntrega.setDate(dataEntrega.getDate() + pedido.prazo);
          pedido.dataEntrega = dataEntrega;
          pedido.dataEstimativa = pedido.dataEntrega;
          this.pedidoService.inserir(pedido).subscribe({
            next: (response) => {
              console.log(this.pedido)
              this.activeModal.close();
              this.abrirModalDadosPedido(this.pedido);
            },
            error: (err) => {
              this.mensagem = `Erro ao recusar orçamento do pedido ${pedido.id}`;
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
    return this.pedidoService.determinarPrazo(pedido);
  }
}