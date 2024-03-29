import { Component, Input } from '@angular/core';
import { Usuario } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {
  @Input() usuario: Usuario = new Usuario();

  constructor(public activeModal: NgbActiveModal) {}

}
