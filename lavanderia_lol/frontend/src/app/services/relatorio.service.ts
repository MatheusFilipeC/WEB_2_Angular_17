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

  obterReceitas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/relatorio/receitas`);
  }
}
