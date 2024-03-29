import { Injectable } from '@angular/core';
import { Roupa } from '../shared';

const LS_CHAVE: string = "roupas";

@Injectable({
  providedIn: 'root'
})
export class RoupaService {

  constructor() { }
  listarTodos(): Roupa[] {
    const roupasLocalStorage = localStorage[LS_CHAVE];
    const roupasCadastradas: Roupa[] = [
      { idRoupa: 1, nomPecaRoupa: 'Camiseta', precoRoupa: 20.00, prazoLavagemRoupa: 2, habilitada: false },
      { idRoupa: 2, nomPecaRoupa: 'Calça Jeans', precoRoupa: 40.00, prazoLavagemRoupa: 3, habilitada: false },
      { idRoupa: 3, nomPecaRoupa: 'Camisa', precoRoupa: 50.00, prazoLavagemRoupa: 4, habilitada: false },
      { idRoupa: 4, nomPecaRoupa: 'Cueca', precoRoupa: 10.00, prazoLavagemRoupa: 1, habilitada: false },
      { idRoupa: 5, nomPecaRoupa: 'Meia', precoRoupa: 5.00, prazoLavagemRoupa: 1, habilitada: false },
    ];
    let roupas = roupasLocalStorage ? JSON.parse(roupasLocalStorage) : [];
    const roupasAdicionadas = roupas.some(
      (cadastrada: Roupa) => roupasCadastradas.some((c) => c.idRoupa === cadastrada.idRoupa));
      if (!roupasAdicionadas) {
        roupas = roupasCadastradas };
      return roupas;
  }

  inserir(roupa: Roupa): void {
    const roupas = this.listarTodos();
    const novoId = Math.max(...roupas.map(roupa => (roupa.idRoupa || 0)), 0) + 1;
    roupa.idRoupa = novoId;
    roupa.habilitada = false;
    roupas.push(roupa);
    localStorage[LS_CHAVE] = JSON.stringify(roupas);
  }

  atualizar(roupa: Roupa): void {
    const roupas: Roupa[] = this.listarTodos();
    roupas.forEach( (obj, index, objs) => {
      if (roupa.idRoupa === obj.idRoupa) {
        roupa.habilitada = false;
        objs[index] = roupa;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(roupas);
  }

  remover(id: number): void {
    let roupas: Roupa[] = this.listarTodos();
    roupas = roupas.filter(roupa => roupa.idRoupa !== id);
    localStorage[LS_CHAVE] = JSON.stringify(roupas);
  }
}
