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
  roupa! : Roupa;
  roupas: Roupa[] = [];

  constructor(
    private roupaService: RoupaService) { }

    ngOnInit(): void {
      this.roupas = this.listarTodos();
      }

  linhaSelecionada: any = null;

  listarTodos(): Roupa[] {
    return this.roupaService.listarTodos();
  }

  adicionarNovaLinha(): void {
    const novaRoupa: Roupa = {
      idRoupa: 0,
      nomPecaRoupa: '',
      precoRoupa: 0,
      prazoLavagemRoupa: 0,
      habilitada: true,
    };
    this.roupas.push(novaRoupa);
    this.linhaSelecionada = null;
  }

  selecionarLinha(index: Roupa): void {
    this.linhaSelecionada = index.idRoupa;
    index.habilitada = true;
  }

  excluirLinha ($event: any, roupa: Roupa): void {
    $event.preventDefault();
      this.roupaService.remover(roupa.idRoupa!);
      this.roupas = this.listarTodos();
  }

  inserir(obj: Roupa): void {
    this.roupaService.inserir(obj);
    this.linhaSelecionada = null;
    this.listarTodos();
  }

  salvarEdicao(obj: Roupa): void {
    this.linhaSelecionada = null;
    this.roupaService.atualizar(obj);
    this.listarTodos();
    console.log(this.roupas)
  }
}

