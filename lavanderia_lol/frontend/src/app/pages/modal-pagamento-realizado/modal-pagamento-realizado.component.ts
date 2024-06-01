import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-pagamento-realizado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-pagamento-realizado.component.html',
  styleUrl: './modal-pagamento-realizado.component.css'
})
export class ModalPagamentoRealizadoComponent {
  @Input() pedido!: Pedido;
  
  constructor(public activeModal: NgbActiveModal) {}

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

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

}
