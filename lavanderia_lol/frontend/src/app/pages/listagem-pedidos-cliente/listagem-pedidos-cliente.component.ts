import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services';
import { Pedido, SharedModule } from '../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCancelarComponent } from '../modal-cancelar-pedido/modal-cancelar.component';
import { ModalPedidoComponent } from '../modal-confirma-pagamento/modal-pedido.component';

@Component({
  selector: 'app-listagem-pedidos-cliente',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    SharedModule
  ],
  templateUrl: './listagem-pedidos-cliente.component.html',
  styleUrl: './listagem-pedidos-cliente.component.css'
})
export class ListagemPedidosClienteComponent implements OnInit{
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido [] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";
  statusSelecionado: string = "";

  constructor (private pedidoService: PedidoService,
              private modalService: NgbModal) { }

  usuarioLogado = this.pedidoService.usuarioLogado;


  ngOnInit(): void {
    this.listarPedidos();
  }

  abrirModalPedido(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  abrirModalCancelar(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalCancelarComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  listarPedidos(): Pedido[] {
    this.pedidoService.listarTodos().subscribe({
      next: (data: Pedido[] | null) => {
        if (data == null) {
          this.pedidos = [];
        } else {
          this.pedidos = data;
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de pedidos";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.pedidos;
  }

  ordenarPedidos(): Pedido[] {
    const pedidosCliente = this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.cliente.id === this.usuarioLogado.id);
    const pedidosOrdenados = pedidosCliente.slice().sort((a, b) => {
      const dataA = a.dataPedido ? new Date(a.dataPedido).getTime() : 0;
      const dataB = b.dataPedido ? new Date(b.dataPedido).getTime() : 0;
      return dataB - dataA;
    });
    return pedidosOrdenados;
  }

  formatarData(data: Date): string {
    const dataObj = new Date(data);
  
    if (isNaN(dataObj.getTime())) {
      return 'Data inválida';
    }
  
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); 
    const ano = String(dataObj.getFullYear());
    const hora = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
  
    return `${dia}-${mes}-${ano} ${hora}:${minutos}`;
  }

  temPedidos(): boolean {
    return this.pedidosFiltrados.length > 0;
  }
}