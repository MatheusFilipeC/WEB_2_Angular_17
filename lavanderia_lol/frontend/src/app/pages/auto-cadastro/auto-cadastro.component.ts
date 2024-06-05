import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Cliente, SharedModule } from '../../shared';
import { ClienteService } from '../../services/cliente.service';
import { NgxMaskDirective } from 'ngx-mask';

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
    private router: Router) { }

  inserir(): void {
    if (this.formCliente.form.valid) {
      this.clienteService.inserir(this.cliente).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/login"]);
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
}
