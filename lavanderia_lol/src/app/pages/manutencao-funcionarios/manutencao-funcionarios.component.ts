import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../shared';

@Component({
  selector: 'app-manutencao-funcionarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './manutencao-funcionarios.component.html',
  styleUrl: './manutencao-funcionarios.component.css'
})
export class ManutencaoFuncionariosComponent implements OnInit {

  funcionarios : Funcionario[] = [];
  funcionario : Funcionario = new Funcionario()
  constructor (private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarios = this.funcionarioService.listarTodos();
  }

  listarFuncionarios(): Funcionario[] {
    return this.funcionarioService.listarTodos();
  }

  linhaSelecionada: any = null;

  adicionarNovaLinha(): void {
    const novoFuncionario: Funcionario = {
      idFuncionario: 0,
      nomeFuncionario: '',
      cpf: '',
      email: '',
      senha: '',
      dataNascimento: new Date(),
      habilitada: true,
    };
    this.funcionarios.push(novoFuncionario);
    this.linhaSelecionada = 0;
  }

  selecionarLinha(index: Funcionario): void  {
    this.linhaSelecionada = index.idFuncionario;
    index.habilitada = true;
  }

  excluirLinha($event: any, funcionario: Funcionario): void {
    $event.preventDefault();
    {
      this.funcionarioService.remover(funcionario.idFuncionario!);
      this.funcionarios = this.listarFuncionarios();
    }
  }

  salvarEdicao(obj: Funcionario): void {
    this.funcionarioService.inserir(this.funcionario)
    this.linhaSelecionada = null;
    obj.habilitada = false;
  }

  inserir(): void {
      this.funcionarioService.inserir(this.funcionario);
      console.log(this.funcionarios)
  }
}

