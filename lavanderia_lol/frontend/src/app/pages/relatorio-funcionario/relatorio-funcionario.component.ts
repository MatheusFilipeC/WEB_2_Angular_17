import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { Cliente } from '../../shared';
import { ClienteService } from '../../services/cliente.service';
import { RelatorioService } from '../../services/relatorio.service';

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

  constructor(private clienteService: ClienteService,
              private relatorioService: RelatorioService
              ) { }

  gerarRelatorioReceitas() {
    const doc = new jsPDF();
    doc.text('Relatório de Receitas', 10, 10);
    doc.text(`Período: ${this.dataInicial} - ${this.dataFinal}`, 10, 20);
    doc.save('relatorio_receitas.pdf');
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
    doc.text('Lista de Clientes:', 10, 20);
    let startY = 40;
    this.clientes.forEach((cliente, index) => {
      const texto = `
      nome: ${cliente.nome}, email: ${cliente.email}`;
      doc.text(texto, 10, startY);
      startY += 10;
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
    doc.text('Relatório de Clientes Fieis', 10, 10);
    
    let startY = 30;
    this.clientesFieis.forEach((cliente, index) => {
      const texto = `${index + 1}º Cliente com mais pedidos: ${cliente[1]}. Número total de pedidos: ${cliente[2]}. 
      Valor total gasto pelo cliente: R$ ${cliente[3].toFixed(2)}`;
      doc.text(texto, 10, startY);
      startY += 20; 
    });

    doc.save('relatorio_clientes_fieis.pdf');
  }

}
