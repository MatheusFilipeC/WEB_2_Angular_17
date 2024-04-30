import { Component, OnInit } from '@angular/core';
import { Cliente, Pedido, Roupa, SharedModule } from '../../shared';
import { LoginService, PedidoService } from '../../services';
import { RoupaService } from '../../services/roupa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAceitarComponent } from '../modal-aceitar-orcamento/modal-aceitar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-novo-pedido-cliente',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './novo-pedido-cliente.component.html',
  styleUrl: './novo-pedido-cliente.component.css'
})
export class NovoPedidoClienteComponent implements OnInit {
  pedido: Pedido = new Pedido();
  roupas: Roupa[] = [];
  cliente: Cliente = new Cliente();
  roupaSelecionada: Roupa | undefined;

  constructor(
    private pedidoService: PedidoService,
    private roupaService: RoupaService,
    private loginService: LoginService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.roupas = this.roupaService.listarTodos();
  }

  adicionarItem(): void {
    const roupasPedido = this.pedido?.roupas ?? [];
    let valorPedido = this.pedido?.valor ?? 0;
    if (this.roupaSelecionada && this.roupaSelecionada.precoRoupa !== undefined) {
      roupasPedido.push({
        nomeRoupa: this.roupaSelecionada.nomPecaRoupa,
        valorLavagemPeca: Number(this.roupaSelecionada.precoRoupa),
        prazo: this.roupaSelecionada.prazoLavagemRoupa
      });
      if (this.loginService.usuarioLogado) {
        const usuarioLogado = this.loginService.usuarioLogado;
        const clientePedido: Cliente = {
          idCliente: usuarioLogado.id,
          nomeCliente: usuarioLogado.nome
        };
        this.pedido.cliente = clientePedido;
  
      valorPedido += Number(this.roupaSelecionada.precoRoupa)
      this.roupaSelecionada = undefined;
      if (this.pedido) {
        this.pedido.roupas = roupasPedido;
        this.pedido.valor = valorPedido;
        }
      }
    }
  }

  abrirModalAceitar(pedido: Pedido): void {
    const modalRef = this.modalService.open(ModalAceitarComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  recusarOrcamento(pedido: Pedido): void {
    this.pedidoService.recusarOrcamento(pedido);
  }

}

