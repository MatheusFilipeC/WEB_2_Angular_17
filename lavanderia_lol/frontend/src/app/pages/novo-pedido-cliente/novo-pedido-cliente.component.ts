import { Component, OnInit } from '@angular/core';
import { Cliente, Pedido, Roupa, RoupasPedido, SharedModule } from '../../shared';
import { PedidoService } from '../../services';
import { RoupaService } from '../../services/roupa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAceitarComponent } from '../modal-aceitar-orcamento/modal-aceitar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

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
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private roupaService: RoupaService,
    private modalService: NgbModal
  ) { }

  usuarioLogado = this.pedidoService.usuarioLogado;

  ngOnInit(): void {
    this.listarRoupas();
  }

  listarRoupas(): Roupa[] {
    this.roupaService.listarTodos().subscribe({
      next: (data: Roupa[] | null) => {
        if (data == null) {
          this.roupas = [];
        } else {
          this.roupas = data;
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de pedidos";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.roupas;
  }

  adicionarItem() {
    if (this.roupaSelecionada) {
      const roupaAdicionada: RoupasPedido = {
        idRoupa: this.roupaSelecionada.id,
        pecaRoupa: this.roupaSelecionada.pecaRoupa,
        valorPeca: this.roupaSelecionada.preco,
        quantidade: 1,
        prazo: this.roupaSelecionada.prazo
      }
  
      this.pedido.roupas = this.pedido.roupas || [];
      
      const roupaExistente = this.pedido.roupas.find(
        item => item.idRoupa === roupaAdicionada.idRoupa
      );
  
      if (roupaExistente) {
        roupaExistente.quantidade = (roupaExistente.quantidade || 0) + 1;
      } else {
        this.pedido.roupas.push(roupaAdicionada);
      }
      
      this.calcularTotal();
    }
  }

  calcularTotal() {
    this.pedido.valor = (this.pedido.roupas ?? []).reduce((total, item) => {
      return total + ((item.valorPeca ?? 0) * (item.quantidade ?? 0));
    }, 0);
  }

  abrirModalAceitar(pedido: Pedido): void {
    const modalRef = this.modalService.open(ModalAceitarComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  recusarOrcamento(pedido: Pedido): void {
    this.clienteService.buscarPorId(this.usuarioLogado.id).subscribe({
      next: (cliente: Cliente | null) => {
        if (cliente !== null) {
          pedido.cliente = cliente;
          pedido.statusPedido = 'Rejeitado';
          this.pedidoService.inserir(pedido).subscribe({
            next: (response: Pedido | null) => {
              if (response !== null) {
                this.pedido = response;
                location.reload();
              } else {
                this.mensagem = 'Pedido não encontrado';
              }
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

}

