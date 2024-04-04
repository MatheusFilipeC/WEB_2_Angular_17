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
    const funcionariosCadastradas: Funcionario[] = [
      { idFuncionario: 1, nomeFuncionario: 'Maria', email: "maria@mail.com", senha: "******", dataNascimento: new Date('1985-02-21'), habilitada: false },
      { idFuncionario: 2, nomeFuncionario: 'Mário', email: "mario@mail.com", senha: "******", dataNascimento: new Date('1988-07-12'), habilitada: false },
    ];
    let funcionarios = funcionariosLocalStorage ? JSON.parse(funcionariosLocalStorage) : [];
    const funcionariosCadastradasAdicionadas = funcionarios.some(
      (cadastrada: Funcionario) => funcionariosCadastradas.some((c) => c.idFuncionario === cadastrada.idFuncionario));
      if (!funcionariosCadastradasAdicionadas) {
    funcionarios = funcionarios.concat(funcionariosCadastradas); 
      }
  return funcionarios;
  }

  inserir(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();
    const novoId = Math.max(...funcionarios.map(funcionario => (funcionario.idFuncionario || 0)), 0) + 1;
    funcionario.idFuncionario = novoId;
    funcionario.habilitada = false;
    funcionarios.push(funcionario);
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
  }

  buscarPorId(id: number): Funcionario | undefined {
    const funcionarios = this.listarTodos();
    return funcionarios.find(funcionario => funcionario.idFuncionario === id);
  }

  atualizar(funcionario: Funcionario): void {
    const funcionarios: Funcionario[] = this.listarTodos();
    funcionarios.forEach( (obj, index, objs) => {
      if (funcionario.idFuncionario === obj.idFuncionario) {
        funcionario.habilitada = false;
        objs[index] = funcionario;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
  }

  remover(id: number): void {
    let funcionarios: Funcionario[] = this.listarTodos();
    funcionarios = funcionarios.filter(funcionario => funcionario.idFuncionario !== id);
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
  }
}
