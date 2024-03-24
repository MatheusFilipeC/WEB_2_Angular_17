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

  funcionario! : Funcionario;
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService) { }

    ngOnInit(): void {
      this.funcionarios = this.listarTodos();
      }

  linhaSelecionada: any = null;

  adicionarNovaLinha(): void {
    const novoFuncionario: Funcionario = {
      idFuncionario: 0,
      nomeFuncionario: '',
      email: "",
      senha: "",
      dataNascimento: new Date(),
      habilitada: true,
    };
    this.funcionarios.push(novoFuncionario);
    this.linhaSelecionada = null;
  }

  selecionarLinha(index: Funcionario): void {
    this.linhaSelecionada = index.idFuncionario;
    index.habilitada = true;
  }

  excluirLinha ($event: any, funcionario: Funcionario): void {
    $event.preventDefault();
      this.funcionarioService.remover(funcionario.idFuncionario!);
      this.funcionarios = this.listarTodos();
  }

  inserir(obj: Funcionario): void {
    this.funcionarioService.inserir(obj);
    this.linhaSelecionada = null;
    this.listarTodos();
  }

  salvarEdicao(obj: Funcionario): void {
    this.linhaSelecionada = null;
    this.funcionarioService.atualizar(obj);
    this.listarTodos();
  }

  listarTodos(): Funcionario[] {
    return this.funcionarioService.listarTodos();
  }
}

