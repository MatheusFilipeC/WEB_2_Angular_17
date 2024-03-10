import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../shared/models/cliente.model';

@Component({
  selector: 'app-auto-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auto-cadastro.component.html',
  styleUrl: './auto-cadastro.component.css'
})
export class AutoCadastroComponent {
  momentForm: FormGroup;
  cliente: Cliente = new Cliente();

  constructor(private formBuilder: FormBuilder) {
    this.momentForm = this.formBuilder.group({
      nomeCliente: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  inserir() {
    if (this.momentForm.valid) {
      this.cliente = this.momentForm.value;
      console.log('Inserindo cliente:', this.cliente);
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
}
