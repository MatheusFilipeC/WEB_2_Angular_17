import { Injectable } from '@angular/core';
import { Cliente } from '../shared';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  BASE_URL = "http://localhost:8080/clientes";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Cliente[] | null> {
    return this.httpClient.get<Cliente[]> (
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of ([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  inserir(cliente: Cliente): Observable <Cliente | null> {
    return this.httpClient.post<Cliente>(
      this.BASE_URL, JSON.stringify(cliente),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status == 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      )
  }

  buscarPorId(id: number): Observable<Cliente | null> {
    return this.httpClient.get<Cliente> (
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }

  remover(id: number): Observable <Cliente | null> {
    return this.httpClient.delete<Cliente>(this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        })
      );
  }

  atualizar(cliente: Cliente): Observable<Cliente | null> {
    return this.httpClient.put<Cliente>(this.BASE_URL + "/" + cliente.id,
      JSON.stringify(cliente),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status==200) {
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