import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pedido, SharedModule } from '../../shared';
import { PedidoService } from '../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCancelarComponent } from '../modal-cancelar-pedido/modal-cancelar.component';

@Component({
  selector: 'app-inicial-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  templateUrl: './inicial-cliente.component.html',
  styleUrl: './inicial-cliente.component.css'
})
export class InicialClienteComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(private pedidoService: PedidoService,
    private modalService: NgbModal
  ) { }

  usuarioLogado = this.pedidoService.usuarioLogado;

  filtrarPedidosUsuarioLogado(): void {
    this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.cliente.id === this.usuarioLogado.id);
  }

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
          this.filtrarPedidosUsuarioLogado();
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de pedidos";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.pedidos;
  }

  abrirModalCancelar(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalCancelarComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  formatarData(data: Date): string {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  temPedidosEmAberto(): boolean {
    return this.pedidosFiltrados.some(pedido => pedido.statusPedido === 'Em Aberto');
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

}
