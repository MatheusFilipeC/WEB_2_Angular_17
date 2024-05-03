import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Cliente, SharedModule } from '../../shared';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-auto-cadastro',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    SharedModule
  ],
  templateUrl: './auto-cadastro.component.html',
  styleUrl: './auto-cadastro.component.css'
})
export class AutoCadastroComponent implements OnInit {
  @ViewChild('formCliente') formCliente! : NgForm;
  cliente! : Cliente

  constructor(private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  inserir() {
    if (this.formCliente.valid) {
      this.clienteService.inserir(this.cliente);
      console.log(this.cliente);
      this.router.navigate( ["/login"]);
    }
  }
}
