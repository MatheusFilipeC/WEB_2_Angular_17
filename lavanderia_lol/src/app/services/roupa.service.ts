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
      { idRoupa: 2, nomPecaRoupa: 'Calça Jeans', precoRoupa: 50.00, prazoLavagemRoupa: 3, habilitada: false },
    ];
    let roupas = roupasLocalStorage ? JSON.parse(roupasLocalStorage) : [];
    const roupasCadastradasAdicionadas = roupas.some(
      (cadastrada: Roupa) => roupasCadastradas.some((c) => c.idRoupa === cadastrada.idRoupa));
      if (!roupasCadastradasAdicionadas) {
    roupas = roupas.concat(roupasCadastradas); 
      }
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
