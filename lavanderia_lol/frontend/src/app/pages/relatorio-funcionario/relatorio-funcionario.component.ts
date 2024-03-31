import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-funcionario',
  templateUrl: './relatorio-funcionario.component.html',
  styleUrls: ['./relatorio-funcionario.component.css']
})
export class RelatorioFuncionarioComponent {

  constructor() { }

  gerarRelatorioReceitasPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Receitas', 10, 10);
    doc.save('relatorio_receitas.pdf');
  }

  gerarRelatorioClientesPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Clientes', 10, 10);
    doc.save('relatorio_clientes.pdf');
  }

  gerarRelatorioClientesFieisPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Clientes Fiéis', 10, 10);
    doc.save('relatorio_clientes_fieis.pdf');
  }
}
