import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Cliente, SharedModule, Usuario } from '../../shared';
import { ClienteService } from '../../services/cliente.service';
import { NgxMaskDirective } from 'ngx-mask';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSenhaGeradaComponent } from '../modal-senha-gerada/modal-senha-gerada.component';

@Component({
  selector: 'app-auto-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgxMaskDirective
  ],
  templateUrl: './auto-cadastro.component.html',
  styleUrl: './auto-cadastro.component.css'
})
export class AutoCadastroComponent {
  @ViewChild('formCliente') formCliente!: NgForm;
  cliente: Cliente = new Cliente();
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(private clienteService: ClienteService,
              private router: Router,
              private modalService: NgbModal) { }

    inserir(): void {
      if (this.formCliente.form.valid) {
        this.clienteService.inserir(this.cliente).subscribe({
          next: (response: Cliente | null) => {
            if (response !== null) {
              this.cliente = response;
              this.router.navigate(["/login"]);
              this.abrirModalSenha(this.cliente);
            } else {
              this.mensagem = 'Cliente não encontrado';
            }
          },
          error: (err) => {
            this.mensagem = `Erro no cadastro do cliente ${this.cliente.nome}`;
            if (err.status == 409) {
              this.mensagem_detalhes = "Já existe um cliente cadastrado com esse e-mail ou com esse CPF";
            } else {
              this.mensagem_detalhes = `[${err.status}] ${err.message}`
            }
          }
        });
      }
    }

    abrirModalSenha(cliente: Cliente): void {
      const modalRef = this.modalService.open(ModalSenhaGeradaComponent);
      modalRef.componentInstance.cliente = cliente;
    }
}
