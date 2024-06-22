import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import Utils from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  BASE_URL = "http://localhost:8080/funcionarios";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Funcionario[] | null> {
    return this.httpClient.get<Funcionario[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Funcionario[]>) => {
          if (resp.status === 200 && resp.body != null) {
            resp.body.map (p => {
              p.dataNascimento = Utils.dateFromRest(p.dataNascimento);
            })
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  inserir(funcionario: Funcionario): Observable<Funcionario | null> {
    funcionario.dataNascimento = Utils.dateToRest(funcionario.dataNascimento);
    return this.httpClient.post<Funcionario>(this.BASE_URL, JSON.stringify(funcionario),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Funcionario>) => {
          if(resp.status == 201 && resp.body != null) {
            resp.body.dataNascimento = Utils.dateFromRest(resp.body.dataNascimento);
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  buscarPorId(id: number): Observable<Funcionario | null>  {
    return this.httpClient.get<Funcionario>(
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Funcionario>) => {
          if (resp.status == 200 && resp.body != null) {
            resp.body.dataNascimento = Utils.dateFromRest(resp.body.dataNascimento);
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of (null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario | null> {
    funcionario.dataNascimento = Utils.dateToRest(funcionario.dataNascimento);
    return this.httpClient.put<Funcionario>(this.BASE_URL + "/" + funcionario.id,
      JSON.stringify(funcionario),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Funcionario>) => {
          if (resp.status == 200 && resp.body != null) {
            resp.body.dataNascimento = Utils.dateFromRest(resp.body.dataNascimento)
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  remover(id: number): Observable<Funcionario | null> {
    return this.httpClient.delete<Funcionario>(this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Funcionario>) => {
          if (resp.status == 200 && resp.body != null) {
            resp.body.dataNascimento = Utils.dateFromRest(resp.body.dataNascimento);
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
