import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  obterRelatorioClientesFieis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/relatorio/fieis`);
  }

  obterReceitas(dataInicial?: string, dataFinal?: string): Observable<any> {
    let params = new HttpParams();
    if (dataInicial) {
      params = params.set('dataInicial', dataInicial);
    }
    if (dataFinal) {
      params = params.set('dataFinal', dataFinal);
    }

    return this.http.get<any>(`${this.baseUrl}/relatorio/receitas`, { params });
  }
}
