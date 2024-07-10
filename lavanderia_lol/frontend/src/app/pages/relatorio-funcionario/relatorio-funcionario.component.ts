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

    // Dados fictícios
    const receitas = [
      { id: 1, descricao: 'Venda de produto A', valor: 100.00 },
      { id: 2, descricao: 'Venda de produto B', valor: 200.00 },
      { id: 3, descricao: 'Serviço de consultoria', valor: 300.00 }
    ];

    let y = 20;
    receitas.forEach(receita => {
      doc.text(`ID: ${receita.id} - Descrição: ${receita.descricao} - Valor: R$ ${receita.valor.toFixed(2)}`, 10, y);
      y += 10;
    });

    doc.save('relatorio_receitas.pdf');
  }

  gerarRelatorioClientesPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Clientes', 10, 10);

    // Dados fictícios
    const clientes = [
      { id: 1, nome: 'Cliente A', email: 'clientea@example.com' },
      { id: 2, nome: 'Cliente B', email: 'clienteb@example.com' },
      { id: 3, nome: 'Cliente C', email: 'clientec@example.com' }
    ];

    let y = 20;
    clientes.forEach(cliente => {
      doc.text(`ID: ${cliente.id} - Nome: ${cliente.nome} - Email: ${cliente.email}`, 10, y);
      y += 10;
    });

    doc.save('relatorio_clientes.pdf');
  }

  gerarRelatorioClientesFieisPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Clientes Fiéis', 10, 10);

    // Dados fictícios
    const clientesFieis = [
      { id: 1, nome: 'Cliente Fiel A', email: 'clientefiela@example.com', compras: 10 },
      { id: 2, nome: 'Cliente Fiel B', email: 'clientefielb@example.com', compras: 15 },
      { id: 3, nome: 'Cliente Fiel C', email: 'clientefielc@example.com', compras: 20 }
    ];

    let y = 20;
    clientesFieis.forEach(cliente => {
      doc.text(`ID: ${cliente.id} - Nome: ${cliente.nome} - Email: ${cliente.email} - Compras: ${cliente.compras}`, 10, y);
      y += 10;
    });

    doc.save('relatorio_clientes_fieis.pdf');
  }
}
