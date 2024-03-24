import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario.model';

const LS_CHAVE: string = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor() { }

  listarTodos(): Funcionario[] {
    const funcionariosLocalStorage = localStorage[LS_CHAVE];
    const funcionariosCadastrados: Funcionario[] = [
      { idFuncionario: 1, nomeFuncionario: 'Maria', cpf: '999.999.999-99', email: 'maria@mail.com', senha: '*********', dataNascimento: new Date('1985-02-21'), habilitada: false },
      { idFuncionario: 2, nomeFuncionario: 'Mário', cpf: '333.333.333-33', email: 'mario@mail.com', senha: '*******', dataNascimento: new Date('1988-07-12'), habilitada: false },
    ];
    let funcionarios = funcionariosLocalStorage ? JSON.parse(funcionariosLocalStorage) : [];
    const funcionariosCadastradosAdicionados = funcionarios.some(
      (cadastrado: Funcionario) => funcionariosCadastrados.some((c) => c.idFuncionario === cadastrado.idFuncionario));
    if (!funcionariosCadastradosAdicionados) {
      funcionarios = funcionarios.concat(funcionariosCadastrados);
    }
    return funcionarios;
  }

  inserir(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();
    const novoId = Math.max(...funcionarios.map(funcionario => (funcionario.idFuncionario || 0)), 0) + 1;
    funcionario.idFuncionario = novoId;
    funcionarios.push(funcionario);
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
    console.log(funcionarios);
  }

  remover(id: number) : void {
    let funcionarios = this.listarTodos();
    funcionarios = funcionarios.filter(funcionario => funcionario.idFuncionario !== id);
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
  }

}
