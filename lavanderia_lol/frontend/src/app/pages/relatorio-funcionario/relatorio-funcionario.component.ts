import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { Cliente } from '../../shared';
import { ClienteService } from '../../services/cliente.service';
import { RelatorioService } from '../../services/relatorio.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-relatorio-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './relatorio-funcionario.component.html',
  styleUrls: ['./relatorio-funcionario.component.css']
})
export class RelatorioFuncionarioComponent {
  clientes: Cliente[] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";
  dataInicial: string = "";
  dataFinal: string = "";
  clientesFieis: any[] = [];
  relatorio: any;

  constructor(private clienteService: ClienteService,
              private relatorioService: RelatorioService
  ) { }

  gerarRelatorioReceitas() {
    this.relatorioService.obterReceitas(this.dataInicial, this.dataFinal).subscribe(
      data => {
        this.relatorio = data;
        this.gerarPDF(data);
      },
      error => {
        console.error('Erro ao obter relatório de receitas:', error);
      }
    );
  }

  gerarPDF(data: any[]) {
    const doc = new jsPDF();

    const colunas = ['Data', 'Valor'];
    const linhas = data.map(item => [item[0], item[1]]);

    doc.text('Relatório de Receitas', 14, 16);
    (doc as any).autoTable({
      head: [colunas],
      body: linhas,
      startY: 20,
    });

    doc.save('relatorio-receitas.pdf');
  }

  gerarRelatorioClientes() {
    this.clienteService.listarTodos().subscribe({
      next: (data: Cliente[] | null) => {
        if (data == null) {
          this.clientes = [];
        } else {
          this.clientes = data;
          this.gerarPDFClientes();
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de clientes";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
  }

  gerarPDFClientes() {
    const doc = new jsPDF();
    doc.text('Lista de Clientes', 14, 16);
  
    const colunas = ['Nome', 'Email'];
    const linhas = this.clientes.map(cliente => [cliente.nome, cliente.email]);
  
    (doc as any).autoTable({
      head: [colunas],
      body: linhas,
      startY: 20,
    });
  
    doc.save('relatorio_clientes.pdf');
  }

  gerarRelatorioClientesFieis() {
    this.relatorioService.obterRelatorioClientesFieis().subscribe({
      next: (data: any[] | null) => {
        if (data == null) {
          this.clientesFieis = [];
        } else {
          this.clientesFieis = data;
          this.gerarPDFClientesFieis();
        }
      },
      error: (err) => {
        this.mensagem = "Erro buscando lista de clientes fiéis";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`
      }
    });
  }

  gerarPDFClientesFieis() {
    const doc = new jsPDF();
    doc.text('Relatório de Clientes Fieis', 14, 16);
  
    const colunas = ['Posição', 'Nome', 'Número de Pedidos', 'Valor Total Gasto'];
    const linhas = this.clientesFieis.map((cliente, index) => [
      `${index + 1}º`,
      cliente[1],
      cliente[2],
      `R$ ${cliente[3].toFixed(2)}`
    ]);
  
    (doc as any).autoTable({
      head: [colunas],
      body: linhas,
      startY: 20,
    });
  
    doc.save('relatorio_clientes_fieis.pdf');
  }

}
