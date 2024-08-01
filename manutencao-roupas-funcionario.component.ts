import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoupaService } from '../../services/roupa.service';
import { Roupa } from '../../shared';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manutencao-roupas-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './manutencao-roupas-funcionario.component.html',
  styleUrl: './manutencao-roupas-funcionario.component.css'
})
export class ManutencaoRoupasFuncionarioComponent implements OnInit {

  roupas: Roupa[] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(
    private roupaService: RoupaService) { }

    ngOnInit(): void {
      this.roupas = this.listarTodos();
      }

  linhaSelecionada: any = null;

  listarTodos(): Roupa[] {
    this.roupaService.listarTodos().subscribe({
      next: (data: Roupa[] | null) => {
        if (data == null) {
          this.roupas = [];
        } else {
          this.roupas = data;
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de funcionários";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
    return this.roupas;
  }

  adicionarNovaLinha(): void {
    const novaRoupa: Roupa = {
      id: 0,
      pecaRoupa: '',
      preco: 0,
      prazo: 0,
      habilitada: true,
    };
    this.roupas.push(novaRoupa);
    this.linhaSelecionada = null;
  }

  selecionarLinha(index: Roupa): void {
    this.linhaSelecionada = index.id;
    index.habilitada = true;
  }

  excluirLinha ($event: any, roupa: Roupa): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover a roupa ${roupa.pecaRoupa}?`)) {
      this.roupaService.remover(roupa.id).subscribe({
        complete: () => { this.listarTodos(); },
        error: (err) => {
          this.mensagem = `Erro removendo roupa ${roupa.id} - ${roupa.pecaRoupa}`;
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      });
    }
  }

  inserir(roupa: Roupa): void {
    this.roupaService.inserir(roupa).subscribe({
      next: (response) => {
        this.linhaSelecionada = null;
        this.listarTodos();
      },
      error: (err) => {
        this.mensagem = `Erro inserindo funcionário ${roupa.pecaRoupa}`;
        if (err.status == 409) {
          this.mensagem_detalhes = "Já existe um usuário com esse e-mail";
        } else {
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      }
    });
  }

  salvarEdicao(roupa: Roupa): void {
    this.roupaService.atualizar(roupa).subscribe({
      next: (usuario) => {
        this.linhaSelecionada = null;
        this.listarTodos();
      },
      error: (err) => {
        this.mensagem = `Erro inserindo funcionário ${roupa.pecaRoupa}`;
        if (err.status == 409) {
          this.mensagem_detalhes = "Já existe um usuário com esse e-mail";
        } else {
          this.mensagem_detalhes = `[${err.status}] ${err.message}`
        }
      }
    });
  }


}