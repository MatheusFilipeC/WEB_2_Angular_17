import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pedido } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmado',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-confirmado.component.html',
  styleUrl: './modal-confirmado.component.css'
})
export class ModalConfirmadoComponent {
  @Input() pedido!: Pedido;
  
  constructor(public activeModal: NgbActiveModal) {}

}
