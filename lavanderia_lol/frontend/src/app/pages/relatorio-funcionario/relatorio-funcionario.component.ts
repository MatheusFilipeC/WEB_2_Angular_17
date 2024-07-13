import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

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
  dataInicial: string = "";
  dataFinal: string = "";

  constructor() { }

  gerarRelatorioReceitas() {
    const doc = new jsPDF();
    doc.text('Relatório de Receitas', 10, 10);
    doc.text(`Período: ${this.dataInicial} - ${this.dataFinal}`, 10, 20);
    doc.save('relatorio_receitas.pdf');
  }

  gerarRelatorioClientes() {
    const doc = new jsPDF();
    doc.text('Lista de Clientes:', 10, 20);
    doc.text('- Cliente 1', 10, 30);
    doc.text('- Cliente 2', 10, 40);
    doc.save('relatorio_clientes.pdf');
  }

  gerarRelatorioClientesFieis() {
    const doc = new jsPDF();
    doc.text('- Cliente 1 (3 pedidos, R$ 500,00 de receita)', 10, 30);
    doc.text('- Cliente 2 (2 pedidos, R$ 400,00 de receita)', 10, 40);
    doc.text('- Cliente 3 (1 pedido, R$ 300,00 de receita)', 10, 50);
    doc.save('relatorio_clientes_fieis.pdf');
  }
}
