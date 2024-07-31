import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cliente } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-senha-gerada',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal-senha-gerada.component.html',
  styleUrl: './modal-senha-gerada.component.css'
})
export class ModalSenhaGeradaComponent {
  @Input() cliente!: Cliente;
  constructor(public activeModal: NgbActiveModal) {}

}
