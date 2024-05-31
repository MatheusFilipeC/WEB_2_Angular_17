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

  funcionarios: Funcionario[] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(
    private funcionarioService: FuncionarioService) { }

    ngOnInit(): void {
      this.funcionarios = this.listarTodos();
      }

  linhaSelecionada: any = null;

  listarTodos(): Funcionario[] {
    this.funcionarioService.listarTodos().subscribe({
      next: (data: Funcionario[] | null) => {
        if (data == null) {
          this.funcionarios = [];
        } else {
          this.funcionarios = data;
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de funcionários";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.funcionarios;
  }

  adicionarNovaLinha(): void {
    const novoFuncionario: Funcionario = {
      id: 0,
      nome: '',
      email: "",
      senha: "",
      dataNascimento: new Date(),
      habilitada: true,
    };
    this.funcionarios.push(novoFuncionario);
    this.linhaSelecionada = null;
  }

  selecionarLinha(index: Funcionario): void {
    this.linhaSelecionada = index.id;
    index.habilitada = true;
  }

  excluirLinha ($event: any, funcionario: Funcionario): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o funcionário ${funcionario.nome}?`)) {
      this.funcionarioService.remover(funcionario.id).subscribe({
        complete: () => { this.listarTodos(); },
        error: (err) => {
          this.mensagem = `Erro removendo funcionário ${funcionario.id} - ${funcionario.nome}`;
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      });
    }
  }

  inserir(funcionario: Funcionario): void {
    this.funcionarioService.inserir(funcionario).subscribe({
      next: (response) => {
        this.linhaSelecionada = null;
        this.listarTodos();
      },
      error: (err) => {
        this.mensagem = `Erro inserindo funcionário ${funcionario.nome}`;
        if (err.status == 409) {
          this.mensagem_detalhes = "Já existe um usuário com esse e-mail";
        } else {
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      }
    });
  }

  salvarEdicao(funcionario: Funcionario): void {
    this.funcionarioService.atualizar(funcionario).subscribe({
      next: (usuario) => {
        this.linhaSelecionada = null;
        this.listarTodos();
      },
      error: (err) => {
        this.mensagem = `Erro inserindo funcionário ${funcionario.nome}`;
        if (err.status == 409) {
          this.mensagem_detalhes = "Já existe um usuário com esse e-mail";
        } else {
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      }
    });
  }

}