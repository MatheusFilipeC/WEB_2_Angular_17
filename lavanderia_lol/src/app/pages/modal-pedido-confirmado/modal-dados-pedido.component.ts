import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-dados-pedido',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './modal-dados-pedido.component.html',
  styleUrl: './modal-dados-pedido.component.css'
})
export class ModalDadosPedidoComponent {
  @Input() pedido!: Pedido;

  constructor (private pedidoService: PedidoService,
              public activeModal: NgbActiveModal,
              ) { }

  listarPedidos(): Pedido[] {
    return this.pedidoService.listarTodos();
  }

  formatarData(data: Date | undefined): string {
    if (data === undefined) {
      return 'Data inválida';
    }
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

  fecharModal() {
    this.activeModal.close();
    location.reload();
  }

}
